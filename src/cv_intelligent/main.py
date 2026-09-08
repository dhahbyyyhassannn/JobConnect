from fastapi import FastAPI
from contextlib import asynccontextmanager
from .security.security import add_cors
from .database import engine, Base
from . import models 
from .Routers import AuthRouter,BookmarksRouter,CategoriesRouter,JobRouter,RequirementRouter,UserRouter, ApplicationsRouter
from .FakeData.fake.FakeData import seed

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    seed()
    yield

app = FastAPI(lifespan=lifespan)
add_cors(app)

app.include_router(AuthRouter.router)
app.include_router(BookmarksRouter.router)
app.include_router(CategoriesRouter.router)
app.include_router(UserRouter.router)
app.include_router(JobRouter.router)
app.include_router(RequirementRouter.router)
app.include_router(ApplicationsRouter.router)