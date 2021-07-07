from schemas.user import Category
from fastapi import APIRouter
from routes.category import categories
from config.db import conn
category = APIRouter()


@category.get('/category')
async def fetch_categories():
    return conn.execute(categories.select()).fetchall()

@category.get('/category{id}')
async def fetch_categories(id: int):
    return conn.execute(categories.select().where(categories.c.id == id)).first()

@category.post('/category')
async def create_category(category: Category):
    conn.execute(categories.insert().values(
        categoryName= category.categoryName,
        description=category.description
    ))
    return conn.execute(categories.select()).fetchall()

@category.put('/category{id}')
async def category(id: int, category: Category):
    conn.execute(categories.update().values(
        categoryName= category.categoryName,
        description=category.description
    ).where(categories.c.id == id))
    return conn.execute(categories.select()).fetchall()


@category.delete('/category{id}')
async def delete_category(id: int):
    conn.execute(categories.delete().where(categories.c.id == id))
    return conn.execute(categories.select()).fetchall()