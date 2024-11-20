from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True, validate=validate.Length(min=3, max=50))
    email = fields.Email(required=True, validate=validate.Email())
    date_joined = fields.DateTime(dump_only=True)
    bio = fields.Str(validate=validate.Length(max=200), allow_none=True)
    is_admin = fields.Bool(dump_only=True)
