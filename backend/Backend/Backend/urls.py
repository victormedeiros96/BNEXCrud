from django.contrib import admin
from django.urls import path
from Produtos.views import ProdutoDetails,ProdutoListAndCreate,UserCreate
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('produtos/', ProdutoListAndCreate.as_view(),name='Produto-List-And-Create'),
    path('produtos/<int:pk>/', ProdutoDetails.as_view(),name='Produto-Details'),
    path('api/token/', TokenObtainPairView.as_view(), name='Obter-Tokens'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='Atualizar-Tokens'),
    path('api/register/', UserCreate.as_view(), name='Registrar'),
]
