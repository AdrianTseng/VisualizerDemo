from flask_restful import Resource, abort, reqparse
from flask_socketio import emit
from Models import TestCase

row_data = reqparse.RequestParser()
row_data.add_argument('name', type=str, help="can not resolve name")


CaseEntities = [
    TestCase("信号灯1", [230, 21], "ball"),
    TestCase("轨道", [[265, 21], [385, 21]], "line"),
    TestCase("信号灯2", [420, 21], "ball"),
]


class Cases(Resource):
    def get(self):
        return {
            "TestCases": [
                each.report() for each in CaseEntities
            ]
        }


class UpdateCase(Resource):
    entities = CaseEntities

    def post(self, state):
        args = row_data.parse_args()
        try:
            self.entities = [each.update_case(args['name'], state) for each in self.entities]
            emit("update", self.entities, broadcast=True, namespace="/")
            return {"UpdatedStatus": self.entities}
        except ValueError as err:
            return abort(401, message=err)
