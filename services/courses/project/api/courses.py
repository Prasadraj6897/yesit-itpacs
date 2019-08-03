from flask import Blueprint, jsonify, redirect, url_for, request, render_template, current_app, flash
from . models import CourseLevel_M, CourseLevelGroup_M, CourseIsFor_M, CourseFallStream_M, Module_M, Assignment_M, CourseDetails_M, Handout_Documents_M, Assignment_Testtype_M, TestUser_M, UserSalary_M, Assignment_Test_M, Questions_M, Video_Details_M, Course_Batch_M, Answers_M, Test_Category_M
from project.app import db, mongoEngine
import json
from sqlalchemy import exc
# from pymongo import MongoClient
from . utils import authenticate
# from mongoengine.queryset.visitor import Q
from . models import COURSE
import base64
import os
import boto
from uuid import uuid4
from project.app import celery
from datetime import date
import time
from bson import json_util
from bson.objectid import ObjectId

courses_blueprint = Blueprint('courses', __name__)

@courses_blueprint.route('/courses/ping', methods=['GET'])
def ping_pong():
	return jsonify({
		'status': 'success',
		'message': 'pong!'
	})

@courses_blueprint.route('/courses/getMyCourseLists', methods=['GET'])
@authenticate
def getMyCourseLists(resp):

	courses = CourseDetails_M.objects.aggregate(*[
				{
					'$lookup': {
						'from':CourseLevel_M._get_collection_name(),
						'localField': 'CourseLevelId',
						'foreignField': '_id',
						'as': 'courselevel'
					}
				},
				{
					'$match' : { 'Creator_Id' : resp }
				}
			])
	course_lists = [json.loads(json.dumps(item, default=json_util.default)) for item in courses]

	response_object = {
						'status': 'Success',
						'message': 'Success alert',
						'courses': course_lists
					}

	
	return jsonify(response_object), 200

@courses_blueprint.route('/courses/getCourseDetails', methods=['POST'])
@authenticate
def getCourseDetails(resp):

	post_data = request.get_json()
	courseid = post_data.get('CourseId')

	courses = CourseDetails_M.objects.aggregate(*[
				{
					'$lookup': {
						'from':CourseLevel_M._get_collection_name(),
						'localField': 'CourseLevelId',
						'foreignField': 'CourseLevelId',
						'as': 'courselevel'
					}
				},
				{
					'$match' : { 
						'Creator_Id' : resp,
						'_id': ObjectId(courseid)
					}
				}
			])
	course_details = [json.loads(json.dumps(item, default=json_util.default)) for item in courses]

	response_object = {
						'status': 'Success',
						'coursedata': course_details
					}

	
	return jsonify(response_object), 200

@courses_blueprint.route('/courses/uploadImageToS3', methods=['POST'])
@authenticate
def uploadImageToS3(resp):
	userId = resp
	post_data = request.get_json()
	imageStr = post_data.get('imageData')
	imgType = post_data.get('imageType')
	imgBorder = post_data.get('imageBorder')
	# prevImage = post_data.get('previousImg')
	# prevImageName = post_data.get('fileName')

	# create new file name
	destination_filename = uuid4().hex + '.' + imgType

	data = {
		'acl': 'public-read',
		'S3_LOCATION': current_app.config['S3_LOCATION'],
		"S3_BUCKET": current_app.config["S3_BUCKET"],
		'S3_KEY': current_app.config['S3_KEY'],
		'S3_SECRET': current_app.config['S3_SECRET'],
		'S3_COURSE_UPLOAD_DIRECTORY': current_app.config['S3_COURSE_UPLOAD_DIRECTORY'],
		'UPLOAD_FOLDER': current_app.config['UPLOAD_FOLDER'],
		'Image_String': imageStr,
		"destinationFileName": destination_filename
	}

	celery.send_task('s3_upload_image', args=[data])
	object_url = "https://s3-{0}.amazonaws.com/{1}/{2}/{3}".format(data["S3_LOCATION"], data["S3_BUCKET"], data["S3_COURSE_UPLOAD_DIRECTORY"], data["destinationFileName"])

	time.sleep(2)

	return jsonify({
		'status': 'success',
		'url': object_url
	})

@courses_blueprint.route('/courses/getCourseLevel', methods=['GET'])
@authenticate
def getCourseLevel(resp):
	courseLevel = CourseLevel_M.objects().to_json()
	courseLevel_lists = json.loads(courseLevel)

	return jsonify({
		'status': 'SUCCESS',
		'message': 'pong!',
		'courseLevelLists':courseLevel_lists
	})

@courses_blueprint.route('/courses/getCourseLevelGroup', methods=['POST'])
@authenticate
def getCourseLevelGroup(resp):
	post_data = request.get_json()
	courseLevelId = post_data.get('courseLevelId')

	courseLevelGroup = CourseLevelGroup_M.objects(__raw__={'CourseLevelId':int(courseLevelId)}).to_json()
	courseLevelGroup_lists = json.loads(courseLevelGroup)

	return jsonify({
		'status': 'SUCCESS',
		'message': 'pong!',
		'courseLevelGroupLists':courseLevelGroup_lists
	})

@courses_blueprint.route('/courses/getCourseFallStream', methods=['POST'])
@authenticate
def getCourseFallStream(resp):
	post_data = request.get_json()
	courseLevelId = int(post_data.get('courseLevelId'))
	if courseLevelId == 1:
		couId = 1
	else:
		couId = 0

	courseLevelStream = CourseFallStream_M.objects(__raw__={'CourseLevelId':couId}).to_json()
	courseLevelStream_lists = json.loads(courseLevelStream)

	return jsonify({
		'status': 'SUCCESS',
		'message': 'pong!',
		'courseFallStreamLists':courseLevelStream_lists
	})

@courses_blueprint.route('/courses/getCourseIsFor', methods=['POST'])
@authenticate
def getCourseIsFor(resp):
	post_data = request.get_json()
	groupLevelId = post_data.get('groupLevelId')

	groupLevelStream = CourseIsFor_M.objects(__raw__={'CourseLevelGroupId':int(groupLevelId)}).to_json()
	groupLevelStream_lists = json.loads(groupLevelStream)

	return jsonify({
		'status': 'SUCCESS',
		'message': 'pong!',
		'groupLevelStreamLists':groupLevelStream_lists
	})


@courses_blueprint.route('/courses/getassignmenttype', methods=['GET'])
@authenticate
def getassignment(resp):
	assignment= Assignment_M.objects().to_json()
	assignment_lists = json.loads(assignment)

	return jsonify({
		'status': 'SUCCESS',
		'message': 'pong!',
		'assignment':assignment_lists
	})

@courses_blueprint.route('/courses/addCourseDetails', methods=['POST'])
@authenticate
def addCourseDetails(resp):
	today 				= date.today()
	CurentDate 			= today.strftime("%d/%m/%Y")

	post_data			= request.get_json()
	CourseName			= post_data.get('courseNameData')
	CourseLogo			= post_data.get('courseLogoData')
	CourseLogoRadius 	= post_data.get('courseLogoRadiusData')
	CourseDescription	= post_data.get('courseDescriptionData')
	Creator_Id			= resp
	CourseLevelId 		= post_data.get('courselevelData')
	CourseLevelGroupId 	= post_data.get('courseGroupData')
	CourseIsForId 		= post_data.get('courseIsForData')
	CourseIsForName		= post_data.get('courseIsForText')
	CourseFallStreamId	= post_data.get('courseFallStreamData')
	CourseFallStreamName= post_data.get('courseFallStreamText')
	AgeFrom				= post_data.get('courseAgeFromData')
	AgeTo				= post_data.get('courseAgeToData')
	CourseTypeId 		= post_data.get('courseTypeData')
	OfficialCourse		= post_data.get('officialCourseData')
	FromDate			= post_data.get('courseFromDate')
	ToDate				= post_data.get('courseToDate')
	SearchTags			= post_data.get('courseSearchTags')
	CreatedDate			= CurentDate
	ModifiedDate		= CurentDate
	Published			= 0

	CourseDetails = CourseDetails_M(
			CourseName = CourseName,
			CourseLogo = CourseLogo,
			CourseLogoRadius = CourseLogoRadius,
			CourseDescription = CourseDescription,
			Creator_Id = Creator_Id,
			CourseLevelId = CourseLevelId,
			CourseLevelGroupId = CourseLevelGroupId,
			CourseIsForId = CourseIsForId,
			CourseIsForName = CourseIsForName,
			CourseFallStreamId = CourseFallStreamId,
			CourseFallStreamName = CourseFallStreamName,
			AgeFrom = AgeFrom,
			AgeTo = AgeTo,
			CourseTypeId = CourseTypeId,
			OfficialCourse = OfficialCourse,
			FromDate = FromDate,
			ToDate = ToDate,
			SearchTags = SearchTags,
			CreatedDate = CreatedDate,
			ModifiedDate = ModifiedDate,
			Published = Published
		)
	result = CourseDetails.save()

	return jsonify({
		'status': 'SUCCESS',
		'message': 'pong!',
		'CourseIsForId': CourseIsForId,
		'UserId': Creator_Id,
		'data': result
	})


@courses_blueprint.route('/courses/insertCourseModule', methods=['POST'])
@authenticate
def insertCourseModule(resp):
	post_data = request.get_json()
	module_name = post_data.get('modulename')
	courseid = post_data.get('courseid')
	user_id = resp

	moduleDetails = Module_M(
						UserId = resp,
						CourseId = courseid,
						ModuleName = module_name,
						Status = 1
					)
	moduleDetails.save()

	modules = Module_M.objects(__raw__={'CourseId':courseid}).to_json()
	module_lists = json.loads(modules)

	return jsonify({
		'status': 'SUCCESS',
		'message': 'pong!',
		'modules': module_lists
	})

@courses_blueprint.route('/courses/getCourseModules', methods=['POST'])
@authenticate
def getCourseModules(resp):
	post_data = request.get_json()
	courseid = post_data.get('courseid')
	user_id = resp

	modules = Module_M.objects(__raw__={'CourseId':courseid}).to_json()
	module_lists = json.loads(modules)

	return jsonify({
		'status': 'SUCCESS',
		'message': 'pong!',
		'modules': module_lists
	})

@courses_blueprint.route('/courses/removeCourseModule', methods=['POST'])
@authenticate
def removeCourseModule(resp):
	post_data = request.get_json()
	moduleid = post_data.get('moduleid')

	# Delete course module
	modules = Module_M.objects(__raw__={'_id': ObjectId(moduleid)}).first()
	modules.delete()

	return jsonify({
		'status': 'SUCCESS',
		'message': 'Module Deleted Successfully!'
	})

@courses_blueprint.route('/courses/getassignmenttesttype', methods=['GET'])
@authenticate
def getassignmenttesttype(resp):
	assignment= Assignment_Testtype_M.objects().to_json()
	assignment_lists = json.loads(assignment)

	return jsonify({
		'status': 'SUCCESS',
		'message': 'pong!',
		'assignment':assignment_lists
	})

@courses_blueprint.route('/courses/insertHandout', methods=['POST'])
@authenticate
def insertHandout(resp):
	post_data = request.get_json()

	creator_id = resp
	course_id = post_data.get('courseid')
	module_id = post_data.get('moduleid')
	handout_name = post_data.get('handoutname')
	description = post_data.get('description')
	document_name = post_data.get('document_name')
	document_extension = post_data.get('document_ext')
	document_size = post_data.get('document_size')
	document_path = "document_path"
	created_on = post_data.get('createddate')
	modified_on = post_data.get('createddate')

	handout_m = Handout_Documents_M(
					creator_id = creator_id,
					view_mode_id = 0,
					handout_price = 0,
					course_id = course_id,
					module_id = module_id,
					handout_name = handout_name,
					description = description,
					document_name = document_name,
					document_extension = document_extension,
					document_type = "application",
					document_size = document_size,
					document_path = document_path,
					created_on = created_on,
					modified_on = modified_on,
					published = 1
				)
	handout_m.save()

	return jsonify({
		'status' : 'Success',
		'data' : course_id
		})

@courses_blueprint.route('/courses/getAllHandoutLists', methods=['GET'])
@authenticate
def getAllHandoutLists(resp):

	handoutdoc= Handout_Documents_M.objects().to_json()
	handout_lists = json.loads(handoutdoc)

	return jsonify({
		'status': 'SUCCESS',
		'message': 'pong!',
		'handout':handout_lists
	})

@courses_blueprint.route('/courses/getHandoutListsMappedWithCourse', methods=['POST'])
@authenticate
def getHandoutListsMappedWithCourse(resp):
	post_data = request.get_json()
	courseid = post_data.get('courseid')
	user_id = resp

	handoutdoc= Handout_Documents_M.objects(__raw__={'course_id':courseid}).to_json()
	handout_lists = json.loads(handoutdoc)

	return jsonify({
		'status': 'SUCCESS',
		'message': 'pong!',
		'handout':handout_lists
	})

@courses_blueprint.route('/courses/insertVideo', methods=['POST'])
@authenticate
def insertVideo(resp):

	today 				= date.today()
	CurentDate 			= today.strftime("%d/%m/%Y")

	post_data = request.get_json()

	creator_id = resp
	course_id = post_data.get('courseid')
	module_id = post_data.get('moduleid')
	video_name = post_data.get('videotitle')
	description = post_data.get('videodescription')
	video_path = post_data.get('videofilepath')
	created_on = CurentDate
	modified_on = CurentDate

	video_m = Video_Details_M(
					creator_id = creator_id,
					course_id = course_id,
					module_id = module_id,
					video_name = video_name,
					description = description,
					video_path = video_path,
					created_on = created_on,
					modified_on = modified_on,
					published = 1
				)
	video_m.save()

	return jsonify({
		'status' : 'Success',
		'message' : "Success"
		})

@courses_blueprint.route('/courses/getAllVideoLists', methods=['GET'])
@authenticate
def getAllVideoLists(resp):

	video = Video_Details_M.objects().to_json()
	video_lists = json.loads(video)

	return jsonify({
		'status': 'SUCCESS',
		'message': 'pong!',
		'video':video_lists
	})

@courses_blueprint.route('/courses/getVideoListsMappedWithCourse', methods=['POST'])
@authenticate
def getVideoListsMappedWithCourse(resp):
	post_data = request.get_json()
	courseid = post_data.get('courseid')
	user_id = resp

	video = Video_Details_M.objects(__raw__={'course_id':courseid}).to_json()
	video_lists = json.loads(video)

	return jsonify({
		'status': 'SUCCESS',
		'message': 'pong!',
		'video':video_lists
	})

@courses_blueprint.route('/courses/insertCourseBatch', methods=['POST'])
@authenticate
def insertCourseBatch(resp):
	today 				= date.today()
	CurentDate 			= today.strftime("%d/%m/%Y")

	post_data = request.get_json()
	batch_name = post_data.get('batchname')
	courseid = post_data.get('courseid')
	user_id = resp

	batchDetails = Course_Batch_M(
						CourseId = courseid,
						BatchName = batch_name,
						Status = 1,
						created_on = CurentDate,
						modified_on = CurentDate
					)
	batchDetails.save()

	return jsonify({
		'status': 'SUCCESS',
		'message': 'pong!'
	})

@courses_blueprint.route('/courses/getCourseBatches', methods=['POST'])
@authenticate
def getCourseBatches(resp):
	post_data = request.get_json()
	courseid = post_data.get('courseid')
	user_id = resp

	batches = Course_Batch_M.objects(__raw__={'CourseId':courseid}).to_json()
	batch_lists = json.loads(batches)

	return jsonify({
		'status': 'SUCCESS',
		'message': 'pong!',
		'batches': batch_lists
	})

@courses_blueprint.route('/courses/testmongo', methods=['GET'])
def testmongo():
	userid = 2
	testname = 'Prasad'
	testemail = 'prasad@gmail.com'
	salary = 5000
	user_id = 5

	# MongoQuery = TestUser_M(
	# 				user_id = userid,
	# 				testname = testname,
	# 				testemail = testemail
	# 			)
	# MongoQuery.save()

	# MongoQuery1 = UserSalary_M(
	# 				user_id = userid,
	# 				salary = salary
	# 			)
	# MongoQuery1.save()

	# test = TestUser_M.objects().first().to_json()
	# result = json.loads(test)
	# ids = result.get('_id')
	cid = [63,64]
	test = Handout_Documents_M.objects.aggregate(*[
			{
				'$lookup': {
					'from':Module_M._get_collection_name(),
					'localField': 'module_id',
					'foreignField': '_id',
					'as': 'modules'
				},

			},
			{
				'$match' : { 
					'creator_id' : user_id,
					'course_id' : '5d11e358e9b898000a18dcff'
				}
			}
		])
	data = [json.loads(json.dumps(item, default=json_util.default)) for item in test]
	# ids = data[0].get('_id')
	return jsonify({
		'status': 'SUCCESS',
		'message': 'pong!',
		'data': data
	})

@courses_blueprint.route('/courses/assignmentdata', methods=['POST'])
@authenticate
def assignmentdata(resp):
	post_data = request.get_json()
	
	assignment_arr = post_data.get('Assignment_field')
	questiontypevalue = assignment_arr.get('questiontypevalue')
	question_arr = post_data.get('Question_field')
	answer_arr = post_data.get('Answer_field')
	# quescheck_arr = post_data.get('QuesCheck_field')
	marks_arr = post_data.get('Marks_field')
	anscheck_arr = post_data.get('Mulanscheck_field')
	category1_arr = post_data.get('Category1_field')
	category2_arr = post_data.get('Category2_field')
	freetext1_arr = post_data.get('Freetext1_field')
	freetext2_arr = post_data.get('Freetext2_field')

	creator_id = resp
	course_id = assignment_arr.get('courseid')
	assignment_testName = assignment_arr.get('assignmentTypename')
	test_name = assignment_arr.get('assignmentname')
	description = assignment_arr.get('assigndesc')
	out_of = assignment_arr.get('grading')
	weightage = assignment_arr.get('weightage')
	start_date = assignment_arr.get('startdate')
	end_date = assignment_arr.get('enddate')
	test_type_id = assignment_arr.get('assigntestid')
	created_on = assignment_arr.get('created_on')
	modified_on = assignment_arr.get('created_on')
	test_duration = assignment_arr.get('duration')
	detailed_description = assignment_arr.get('detaileddesc')
	assignmentTestTypename = assignment_arr.get('assignmentTestTypename')

	try:
		if(int(questiontypevalue) == 1):
			assigntest_m = Assignment_Test_M(
				course_id = course_id,
				view_mode_id = 0,
				test_type_id = test_type_id,
				assignment_testName = assignment_testName,
				test_duration =test_duration,
				grade_id = 0,
				creator_id = creator_id,
				test_name =  test_name,
				test_path = "test_path",
				test_price = 0,
				out_of = out_of,
				description = description,
				detailed_description = detailed_description,
				assignmentTestTypename = assignmentTestTypename,
				weightage = weightage,
				start_date = start_date,
				end_date = end_date,
				created_on = created_on,
				modified_on = modified_on,
				published = 1,

			)
			assignmentvalues = assigntest_m.save()
			getassign_details = assignmentvalues.to_json()
			assignment_id = json.loads(getassign_details).get("_id")["$oid"]

			for i in range(len(question_arr)):
				for key, value in question_arr[i].items():
					question_value = value
					for key, value in marks_arr[i].items():
						mark_value = value

					question_m = Questions_M(
						course_id = course_id,
						assignment_id = assignment_id,
						questiontype = questiontypevalue,
						test_question = question_value,
						mark = mark_value,
						status = 1,
					)
					questionvalues = question_m.save()
					getques_details = questionvalues.to_json()
					test_question_id = json.loads(getques_details).get("_id")["$oid"]

				for key, value in answer_arr[i].items():
					ans_m= Answers_M(
						course_id = course_id,
						assignment_id = assignment_id,
						test_question_id = test_question_id,
						test_answer = value,
						is_correct_answer = 1,
						status = 1,
					)
					ans_m.save()

					c1valueid = "c1id"+str(i)
					c2valueid = "c2id"+str(i)
					f1valueid = "f1id"+str(i)
					f2valueid = "f2id"+str(i)
					
					category1_value = category1_arr[i][c1valueid]
					category2_value = category2_arr[i][c2valueid]
					freetext1_value = freetext1_arr[i][f1valueid]
					freetext2_value = freetext2_arr[i][f2valueid]

					category_m= Test_Category_M(
						course_id = course_id,
						assignment_id = assignment_id,
						test_question_id = test_question_id,
						test_category_1 = category1_value,
						test_category_2 = category2_value,
						free_text_1 = freetext1_value,
						free_text_2 = freetext2_value,
						status = 1,
					)
				
					category_m.save()

		elif(int(questiontypevalue) == 2):
			assigntest_m = Assignment_Test_M(
				course_id = course_id,
				view_mode_id = 0,
				test_type_id = test_type_id,
				assignment_testName = assignment_testName,
				test_duration =test_duration,
				grade_id = 0,
				creator_id = creator_id,
				test_name =  test_name,
				test_path = "test_path",
				test_price = 0,
				out_of = out_of,
				description = description,
				detailed_description = detailed_description,
				assignmentTestTypename = assignmentTestTypename,
				weightage = weightage,
				start_date = start_date,
				end_date = end_date,
				created_on = created_on,
				modified_on = modified_on,
				published = 1,

			)
			assignmentvalues = assigntest_m.save()
			getassign_details = assignmentvalues.to_json()
			assignment_id = json.loads(getassign_details).get("_id")["$oid"]

			for i in range(len(question_arr)):
				for key, value in question_arr[i].items():
					question_value = value
					for key, value in marks_arr[i].items():
						mark_value = value

					question_m = Questions_M(
						course_id = course_id,
						assignment_id = assignment_id,
						questiontype = questiontypevalue,
						test_question = question_value,
						mark = mark_value,
						status = 1,
					)
					questionvalues = question_m.save()
					getques_details = questionvalues.to_json()
					test_question_id = json.loads(getques_details).get("_id")["$oid"]

					for key, value in answer_arr[i].items():
						if ("c"+key in anscheck_arr[i] and str(anscheck_arr[i]["c"+key]) =="True"):
							crt_answer = 1
						else:
							crt_answer = 0
						
						ans_m= Answers_M(
							course_id = course_id,
							assignment_id = assignment_id,
							test_question_id = test_question_id,
							test_answer = value,
							is_correct_answer = crt_answer,
							status = 1
						)
						ans_m.save()

					c1valueid = "c1id"+str(i)
					c2valueid = "c2id"+str(i)
					f1valueid = "f1id"+str(i)
					f2valueid = "f2id"+str(i)
					
					category1_value = category1_arr[i][c1valueid]
					category2_value = category2_arr[i][c2valueid]
					freetext1_value = freetext1_arr[i][f1valueid]
					freetext2_value = freetext2_arr[i][f2valueid]

					category_m= Test_Category_M(
						course_id = course_id,
						assignment_id = assignment_id,
						test_question_id = test_question_id,
						test_category_1 = category1_value,
						test_category_2 = category2_value,
						free_text_1 = freetext1_value,
						free_text_2 = freetext2_value,
						status = 1,
					)
				
					category_m.save()

		elif(int(questiontypevalue) == 3):
			assigntest_m = Assignment_Test_M(
				course_id = course_id,
				view_mode_id = 0,
				test_type_id = test_type_id,
				assignment_testName = assignment_testName,
				test_duration =test_duration,
				grade_id = 0,
				creator_id = creator_id,
				test_name =  test_name,
				test_path = "test_path",
				test_price = 0,
				out_of = out_of,
				description = description,
				detailed_description = detailed_description,
				assignmentTestTypename = assignmentTestTypename,
				weightage = weightage,
				start_date = start_date,
				end_date = end_date,
				created_on = created_on,
				modified_on = modified_on,
				published = 1,

			)
			assignmentvalues = assigntest_m.save()
			getassign_details = assignmentvalues.to_json()
			assignment_id = json.loads(getassign_details).get("_id")["$oid"]

			for i in range(len(question_arr)):
				for key, value in question_arr[i].items():
					question_value = value
					for key, value in marks_arr[i].items():
						mark_value = value

					question_m = Questions_M(
						course_id = course_id,
						assignment_id = assignment_id,
						questiontype = questiontypevalue,
						test_question = question_value,
						mark = mark_value,
						status = 1,
					)
					questionvalues = question_m.save()
					getques_details = questionvalues.to_json()
					test_question_id = json.loads(getques_details).get("_id")["$oid"]
					
					for key, value in answer_arr[i].items():
						if ("r"+key in anscheck_arr[i] and str(anscheck_arr[i]["r"+key]) =="True"):
							crt_answer = 1
						else:
							crt_answer = 0

						ans_m= Answers_M(
							course_id = course_id,
							assignment_id = assignment_id,
							test_question_id = test_question_id,
							test_answer = value,
							is_correct_answer = crt_answer,
							status = 1,
						)
						ans_m.save()

					c1valueid = "c1id"+str(i)
					c2valueid = "c2id"+str(i)
					f1valueid = "f1id"+str(i)
					f2valueid = "f2id"+str(i)
					
					category1_value = category1_arr[i][c1valueid]
					category2_value = category2_arr[i][c2valueid]
					freetext1_value = freetext1_arr[i][f1valueid]
					freetext2_value = freetext2_arr[i][f2valueid]

					category_m= Test_Category_M(
						course_id = course_id,
						assignment_id = assignment_id,
						test_question_id = test_question_id,
						test_category_1 = category1_value,
						test_category_2 = category2_value,
						free_text_1 = freetext1_value,
						free_text_2 = freetext2_value,
						status = 1,
					)
				
					category_m.save()

		elif(int(questiontypevalue) == 4):
			assigntest_m = Assignment_Test_M(
				course_id = course_id,
				view_mode_id = 0,
				test_type_id = test_type_id,
				assignment_testName = assignment_testName,
				test_duration =test_duration,
				grade_id = 0,
				creator_id = creator_id,
				test_name =  test_name,
				test_path = "test_path",
				test_price = 0,
				out_of = out_of,
				description = description,
				detailed_description = detailed_description,
				assignmentTestTypename = assignmentTestTypename,
				weightage = weightage,
				start_date = start_date,
				end_date = end_date,
				created_on = created_on,
				modified_on = modified_on,
				published = 1,

			)
			assignmentvalues = assigntest_m.save()
			getassign_details = assignmentvalues.to_json()
			assignment_id = json.loads(getassign_details).get("_id")["$oid"]

			for i in range(len(question_arr)):
				for key, value in question_arr[i].items():
					question_value = value
					for key, value in marks_arr[i].items():
						mark_value = value

					question_m = Questions_M(
						course_id = course_id,
						assignment_id = assignment_id,
						questiontype = questiontypevalue,
						test_question = question_value,
						mark = mark_value,
						status = 1,
					)
					questionvalues = question_m.save()
					getques_details = questionvalues.to_json()
					test_question_id = json.loads(getques_details).get("_id")["$oid"]

					for key, value in answer_arr[i].items():
						ans_m= Answers_M(
							course_id = course_id,
							assignment_id = assignment_id,
							test_question_id = test_question_id,
							test_answer = value,
							is_correct_answer = 1,
							status = 1,
						)
					
						ans_m.save()
						
					c1valueid = "c1id"+str(i)
					c2valueid = "c2id"+str(i)
					f1valueid = "f1id"+str(i)
					f2valueid = "f2id"+str(i)
					
					category1_value = category1_arr[i][c1valueid]
					category2_value = category2_arr[i][c2valueid]
					freetext1_value = freetext1_arr[i][f1valueid]
					freetext2_value = freetext2_arr[i][f2valueid]

					category_m= Test_Category_M(
						course_id = course_id,
						assignment_id = assignment_id,
						test_question_id = test_question_id,
						test_category_1 = category1_value,
						test_category_2 = category2_value,
						free_text_1 = freetext1_value,
						free_text_2 = freetext2_value,
						status = 1,
					)
				
					category_m.save()
	except ValueError:
		assigntest_m = Assignment_Test_M(
			course_id = course_id,
			view_mode_id = 0,
			test_type_id = test_type_id,
			assignment_testName = assignment_testName,
			test_duration =test_duration,
			grade_id = 0,
			creator_id = creator_id,
			test_name =  test_name,
			test_path = "test_path",
			test_price = 0,
			out_of = out_of,
			description = description,
			detailed_description = detailed_description,
			assignmentTestTypename = assignmentTestTypename,
			weightage = weightage,
			start_date = start_date,
			end_date = end_date,
			created_on = created_on,
			modified_on = modified_on,
			published = 1,

		)
		assignmentvalues = assigntest_m.save()
		# getassign_details = assignmentvalues.to_json()
		# assignment_id = json.loads(getassign_details).get("_id")["$oid"]

	return jsonify({
		'status' : 'Success',
		'id' : question_m ,
		})

@courses_blueprint.route('/courses/getAllAssignmentLists', methods=['GET'])
@authenticate
def getAllAssignmentLists(resp):

	assignmentdoc= Assignment_Test_M.objects().to_json()
	assignment_lists = json.loads(assignmentdoc)

	return jsonify({
		'status': 'SUCCESS',
		'message': 'pong!',
		'assignmentlist':assignment_lists
	})

@courses_blueprint.route('/courses/getAssignmentListsMappedWithCourse', methods=['POST'])
@authenticate
def getAssignmentListsMappedWithCourse(resp):
	post_data = request.get_json()
	courseid = post_data.get('courseid')
	user_id = resp

	assignmentdoc= Assignment_Test_M.objects(__raw__={'course_id':courseid}).to_json()
	assignment_lists = json.loads(assignmentdoc)

	return jsonify({
		'status': 'SUCCESS',
		'message': 'pong!',
		'assignmentlist':assignment_lists
	})

@courses_blueprint.route('/courses/getAllQuestionLists', methods=['POST'])
@authenticate
def getAllQuestionLists(resp):
	
	questiondoc= Questions_M.objects().to_json()
	question_lists = json.loads(questiondoc)

	return jsonify({
		'status': 'SUCCESS',
		'message': 'pong!',
		'questionlist':question_lists
	})

@courses_blueprint.route('/courses/getQuestionListsMappedWithCourse', methods=['POST'])
@authenticate
def getQuestionListsMappedWithCourse(resp):
	post_data = request.get_json()
	assignmentid = post_data.get('AssignmentLastInsertId')
	user_id = resp

	# questiondoc= Questions_M.objects(__raw__={'course_id':courseid}).to_json()
	# question_lists = json.loads(questiondoc)

	# return jsonify({
	# 	'status': 'SUCCESS',
	# 	'message': 'pong!',
	# 	'questionlist':assignmentid
	# })
	# time.sleep(2)
	questions = Questions_M.objects.aggregate(*[
				{
					'$lookup': {
						'from':Assignment_Test_M._get_collection_name(),
						'localField': 'assignment_id',
						'foreignField': 'assignment_id',
						'as': 'questions',
					}
				},
				{
					'$match' : { 
						'assignment_id' : assignmentid,
						# '_id': ObjectId(courseid)
					}
				}
			])
	questions_details = [json.loads(json.dumps(item, default=json_util.default)) for item in questions]

	return jsonify({
		'status' : 'Success',
		'question' : questions_details ,
		})

	# response_object = {
	# 					'status': 'Success',
	# 					'coursedata': course_details
	# 				}

	
	# return jsonify(response_object), 200