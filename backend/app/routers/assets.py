from fastapi import APIRouter, Depends
from .. import crud, models, schemas
from .auth import get_current_user

router = APIRouter(
    prefix="/assets",
    tags=["Assets"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def get_assets(current_user: models.User = Depends(get_current_user)):
    """Get all assets for the current user"""
    assets = await crud.get_assets(user_id=str(current_user.id))
    return assets


@router.post("/", response_model=schemas.Asset)
async def create_asset(asset: schemas.AssetCreate, current_user: models.User = Depends(get_current_user)):
    """Create a new asset for the current user"""
    db_asset = await crud.create_user_asset(asset=asset, user_id=str(current_user.id))
    return db_asset


@router.get("/{asset_id}", response_model=schemas.Asset)
async def get_asset(asset_id: str, current_user: models.User = Depends(get_current_user)):
    """Get a specific asset by ID"""
    asset = await models.Asset.get(asset_id)
    if not asset or asset.user_id != str(current_user.id):
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Asset not found")
    return asset


@router.put("/{asset_id}", response_model=schemas.Asset)
async def update_asset(asset_id: str, asset_update: schemas.AssetCreate, current_user: models.User = Depends(get_current_user)):
    """Update a specific asset by ID"""
    db_asset = await models.Asset.get(asset_id)
    if not db_asset or db_asset.user_id != str(current_user.id):
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Asset not found")
    
    # Update the asset fields
    for field, value in asset_update.dict(exclude_unset=True).items():
        setattr(db_asset, field, value)
    
    await db_asset.save()
    return db_asset


@router.delete("/{asset_id}")
async def delete_asset(asset_id: str, current_user: models.User = Depends(get_current_user)):
    """Delete a specific asset by ID"""
    db_asset = await models.Asset.get(asset_id)
    if not db_asset or db_asset.user_id != str(current_user.id):
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Asset not found")
    
    await db_asset.delete()
    return {"message": "Asset deleted successfully"}