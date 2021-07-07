from pydantic import BaseModel

class User(BaseModel):
    name: str
    email: str
    password: str

class Product(BaseModel):
    ProductName: str
    Unit: str

class Category(BaseModel):
    CategoryName: str
    Description: str