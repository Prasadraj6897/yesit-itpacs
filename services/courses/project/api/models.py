
from flask import current_app
import sys
import datetime
import jwt
from project.app import db, mongoEngine, bcrypt


class COURSE(db.Model):
	__tablename__ = "course_users"
	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	firstname = db.Column(db.String(128), nullable=True)
	lastname = db.Column(db.String(128), nullable=False)
	email = db.Column(db.String(128), unique=True, nullable=False)
	password = db.Column(db.String, nullable=False)
	admin = db.Column(db.Boolean, default=False, nullable=False)
	email_sent = db.Column(db.Boolean, default=False, nullable=False)
	confirmed = db.Column(db.Boolean, default=False, nullable=False)

	def __init__(self, firstname, lastname, email, password):
		self.firstname = firstname
		self.lastname = lastname
		self.email = email	
		self.password = bcrypt.generate_password_hash(password, current_app.config.get('BCRYPT_LOG_ROUNDS')).decode()

	def to_json(self):
		return {
			'id': self.id,
			'firstname': self.firstname,
			'lastname': self.lastname,
			'email': self.email,
			'admin': self.admin,
			'email_sent': self.email_sent,
			'confirmed': self.confirmed
			
		}

	def encode_auth_token(self, user_id):
		try:
			payload = {
					'exp': datetime.datetime.utcnow() + datetime.timedelta(
																days=current_app.config.get('TOKEN_EXPIRATION_DAYS'),
																seconds=current_app.config.get('TOKEN_EXPIRATION_SECONDS')
																),
					'iat': datetime.datetime.utcnow(),
					'sub': user_id
						}
			return jwt.encode(
							payload,
							current_app.config.get('SECRET_KEY'),
							algorithm='HS256'
							)
		except Exception as e:
			return e


	@staticmethod
	def decode_auth_token(auth_token):
		
		try:
			payload = jwt.decode(auth_token, current_app.config.get('SECRET_KEY'))
			return payload['sub']
		except jwt.ExpiredSignatureError:
			return 'Signature expired. Please log in again'
		except jwt.InvalidTokenError:
			return 'Invalid Token. Please log in again'

class User_M(mongoEngine.Document):
	user_id = mongoEngine.IntField(required=True)
	firstname = mongoEngine.StringField(max_length=200, required=True)
	lastname = mongoEngine.StringField(max_length=200, required=True)
	email = mongoEngine.StringField(max_length=200, required=True)
	password = mongoEngine.StringField(max_length=200, required=True)
	email_sent = mongoEngine.BooleanField()
	confirmed  = mongoEngine.BooleanField()
	
class CourseLevel_M(mongoEngine.Document):
	CourseLevelId = mongoEngine.IntField(required=True)
	CourseLevelName = mongoEngine.StringField(max_length=200, required=True)
	CourseLevelStatus = mongoEngine.IntField(required=False)

class CourseLevelGroup_M(mongoEngine.Document):
	CourseLevelGroupId = mongoEngine.IntField(required=True)
	CourseLevelId = mongoEngine.IntField(required=True)
	CourseLevelGroupName = mongoEngine.StringField(max_length=200, required=True)
	CourseLevelGroupStatus = mongoEngine.IntField(required=False)

class CourseFallStream_M(mongoEngine.Document):
	CourseFallStreamId = mongoEngine.IntField(required=True)
	CourseLevelId = mongoEngine.IntField(required=True)
	CourseLevelStreamName = mongoEngine.StringField(max_length=200, required=True)
	CourseLevelStreamStatus = mongoEngine.IntField(required=False)

class CourseIsFor_M(mongoEngine.Document):
	CourseIsForId = mongoEngine.IntField(required=True)
	CourseLevelGroupId = mongoEngine.IntField(required=True)
	GroupLevelStreamName = mongoEngine.StringField(max_length=200, required=True)
	GroupLevelStreamStatus = mongoEngine.IntField(required=False)

class Module_M(mongoEngine.Document):
	UserId = mongoEngine.IntField(required=False)
	CourseId = mongoEngine.StringField(max_length=500, required=False)
	ModuleName = mongoEngine.StringField(max_length=200, required=False)
	Status = mongoEngine.IntField(required=False)

class Assignment_M(mongoEngine.Document):
	AssignmentId = mongoEngine.IntField(required=True)
	AssignmentName = mongoEngine.StringField(max_length=200, required=True)
	AssignmentStatus = mongoEngine.IntField(required=False)

class CourseDetails_M(mongoEngine.Document):
	CourseName = mongoEngine.StringField(max_length=200, required=True)
	CourseLogo = mongoEngine.StringField(max_length=2000, required=False)
	CourseLogoRadius = mongoEngine.IntField(required=True)
	CourseDescription = mongoEngine.StringField(max_length=2000, required=False)
	Creator_Id = mongoEngine.IntField(required=True)
	CourseLevelId = mongoEngine.IntField(required=False)
	CourseLevelGroupId = mongoEngine.IntField(required=False)
	CourseIsForId = mongoEngine.StringField(max_length=200, required=True)
	CourseIsForName = mongoEngine.StringField(max_length=2000, required=True)
	CourseFallStreamId = mongoEngine.StringField(max_length=200,required=False)
	CourseFallStreamName = mongoEngine.StringField(max_length=2000,required=False)
	AgeFrom = mongoEngine.IntField(required=False)
	AgeTo = mongoEngine.StringField(max_length=200, required=False)
	CourseTypeId = mongoEngine.IntField(required=False)
	OfficialCourse = mongoEngine.IntField(required=False)
	FromDate = mongoEngine.StringField(max_length=200, required=False)
	ToDate = mongoEngine.StringField(max_length=200, required=False)
	SearchTags = mongoEngine.StringField(max_length=2000, required=False)
	CreatedDate = mongoEngine.StringField(max_length=200, required=False)
	ModifiedDate = mongoEngine.StringField(max_length=200, required=False)
	Published = mongoEngine.IntField(required=False)

class CourseSchoolGroup_M(mongoEngine.Document):
	CourseSchoolGroupId = mongoEngine.IntField(required=True)
	CourseSchoolGroupName = mongoEngine.StringField(max_length=200, required=True)
	CourseSchoolGroupStatus = mongoEngine.IntField(required=False)

class Handout_Documents_M(mongoEngine.Document):
	creator_id = mongoEngine.IntField(required=True)
	view_mode_id = mongoEngine.IntField(required=True)
	handout_price = mongoEngine.IntField(required=False)
	course_id = mongoEngine.StringField(max_length=200, required=False)
	module_id = mongoEngine.StringField(max_length=200, required=False)
	handout_name = mongoEngine.StringField(max_length=200, required=True)
	description = mongoEngine.StringField(max_length=200, required=True)
	document_name = mongoEngine.StringField(max_length=200, required=True)
	document_extension = mongoEngine.StringField(max_length=200, required=True)
	document_type = mongoEngine.StringField(max_length=200, required=True)
	document_size = mongoEngine.IntField(required=False)
	document_path = mongoEngine.StringField(max_length=200)
	created_on = mongoEngine.StringField(max_length=200)
	modified_on = mongoEngine.StringField(max_length=200, required=True)
	published = mongoEngine.IntField(required=False)

class Video_Details_M(mongoEngine.Document):
	creator_id = mongoEngine.IntField(required=True)
	course_id = mongoEngine.StringField(max_length=200, required=False)
	module_id = mongoEngine.StringField(max_length=200, required=False)
	video_name = mongoEngine.StringField(max_length=200, required=True)
	description = mongoEngine.StringField(max_length=200, required=True)
	video_path = mongoEngine.StringField(max_length=200)
	created_on = mongoEngine.StringField(max_length=200)
	modified_on = mongoEngine.StringField(max_length=200, required=True)
	published = mongoEngine.IntField(required=False)

class Course_Batch_M(mongoEngine.Document):
	CourseId = mongoEngine.StringField(max_length=500, required=False)
	BatchName = mongoEngine.StringField(max_length=200, required=False)
	Status = mongoEngine.IntField(required=False)
	created_on = mongoEngine.StringField(max_length=200)
	modified_on = mongoEngine.StringField(max_length=200)

class Assignment_Testtype_M(mongoEngine.Document):
	AssignmenttypeId = mongoEngine.IntField(required=True)
	AssignmenttypeName = mongoEngine.StringField(max_length=200, required=True)
	AssignmenttypeStatus = mongoEngine.IntField(required=False)

class TestUser_M(mongoEngine.Document):
	user_id = mongoEngine.IntField(required=True)
	testname = mongoEngine.StringField(max_length=200, required=False)
	testemail = mongoEngine.StringField(max_length=200, required=False)

class UserSalary_M(mongoEngine.Document):
	user_id = mongoEngine.IntField(required=True)
	salary = mongoEngine.IntField(required=True)

class Assignment_Test_M(mongoEngine.Document):
	course_id = mongoEngine.StringField(max_length=200, required=False)
	view_mode_id = mongoEngine.IntField(required=True)
	test_type_id = mongoEngine.IntField(required=True)
	assignment_testName = mongoEngine.StringField(max_length=200, required=False)
	test_duration = mongoEngine.StringField(max_length=200, required=False)
	grade_id = mongoEngine.IntField(required=True)
	creator_id = mongoEngine.IntField(required=True)
	test_name = mongoEngine.StringField(max_length=200, required=True)
	test_path = mongoEngine.StringField(max_length=200)
	test_price = mongoEngine.IntField(required=False)
	out_of = mongoEngine.IntField(required=True)
	description = mongoEngine.StringField(max_length=200, required=True)
	detailed_description = mongoEngine.StringField(max_length=200, required=False)
	assignmentTestTypename = mongoEngine.StringField(max_length=200, required=False)
	weightage = mongoEngine.StringField(max_length=200)
	start_date = mongoEngine.StringField(max_length=200)
	end_date = mongoEngine.StringField(max_length=200)
	created_on = mongoEngine.StringField(max_length=200)
	modified_on = mongoEngine.StringField(max_length=200)
	published = mongoEngine.IntField(required=False)

class Questions_M(mongoEngine.Document):
	course_id = mongoEngine.StringField(max_length=200, required=False)
	assignment_id = mongoEngine.StringField(max_length=200, required=False)
	questiontype = mongoEngine.IntField(required=True)
	test_question = mongoEngine.StringField(max_length=200)
	mark = mongoEngine.IntField(required=False)
	status = mongoEngine.IntField(required=True)

class Answers_M(mongoEngine.Document):
	course_id = mongoEngine.StringField(max_length=200, required=False)
	assignment_id = mongoEngine.StringField(max_length=200, required=False)
	test_question_id = mongoEngine.StringField(max_length=200, required=False)
	test_answer = mongoEngine.StringField(max_length=200)
	is_correct_answer = mongoEngine.IntField(required=False)
	status = mongoEngine.IntField(required=True)

class Test_Category_M(mongoEngine.Document):
	course_id = mongoEngine.StringField(max_length=200, required=False)
	assignment_id = mongoEngine.StringField(max_length=200, required=False)
	test_question_id = mongoEngine.StringField(max_length=200, required=False)
	test_category_1 = mongoEngine.StringField(max_length=200)
	test_category_2 = mongoEngine.StringField(max_length=200)
	free_text_1 = mongoEngine.StringField(max_length=200)
	free_text_2 = mongoEngine.StringField(max_length=200)
	status = mongoEngine.IntField(required=True)
