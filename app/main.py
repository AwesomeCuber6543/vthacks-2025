from fastapi import FastAPI
from app.models import Test_Model
app = FastAPI()

@app.get("/")
def hello():
    return {"test": "true"}

# test api with input
@app.get("/with-params")
def with_params_example(test_model: Test_Model):
    return {"test": f"my name is {test_model.name}"} 
