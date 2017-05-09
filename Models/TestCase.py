from .TestType import TestType


Status = {
    "standby": "StandBy",
    "testing": "Testing",
    "succeed": "Succeed",
    "warning": "Warning",
    "failed": "Failed"
}

StatusSet = {"standby", "testing", "succeed", "warning", "failed"}


class TestCase:

    def __init__(self, name, coordinate, case_type):
        self.name = name
        self.type = TestType[case_type]
        self.coordinate = coordinate
        self.status = "standby"

    def report(self):
        return {
            "name": self.name,
            "type": self.type,
            "status": Status[self.status]
        }

    def update_case(self, name, updated_state):
        if name == self.name:
            if updated_state in StatusSet:
                self.status = updated_state
            else:
                raise ValueError("%s is not a appropriate test case state" % updated_state)

        return {
            "name": self.name,
            "status": self.status
        }

    def declare(self):
        if self.type == "Semaphore":
            return "new %s(%d, %d, \"%s\"), " % (self.type, self.coordinate[0], self.coordinate[1], self.name)
        elif self.type == "Railway":
            return "new %s(%d, %d, \"%s\", %d, %d), " % (self.type,
                                                         self.coordinate[0][0],
                                                         self.coordinate[0][1],
                                                         self.name,
                                                         self.coordinate[1][0],
                                                         self.coordinate[1][1])
