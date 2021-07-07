from sqlalchemy import Table, Column
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.sql.sqltypes import Integer, String

from config.db import meta, engine

users =Table('users', meta,
Column('id', Integer, primary_key=True),
Column('name', String(255), unique=True),
Column('email', String(255), unique=True),
Column('password', String(255), unique=True)
)

categories =Table('categories', meta,
Column('categoryID', Integer, primary_key=True),
Column('categoryName', String(255)),
Column('description', String(255))
)

products=Table('products', meta,
Column('productID', Integer, primary_key=True),
Column('productName', String(255)),
Column('supplierID', Integer),
Column('usersID', Integer, ForeignKey("users.id"), nullable=False),
Column('categoryID', Integer, ForeignKey("categories.categoryID"), nullable=False),
Column('unit', String(255)),
Column('price', Integer)
)
meta.create_all(engine)