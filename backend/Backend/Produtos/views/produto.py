from rest_framework import generics
from Produtos.models import Produto
from Produtos.serializers import ProdutoListSerializer,ProdutoDetailsSerializer
from rest_framework.permissions import IsAuthenticated

class ProdutoListAndCreate(generics.ListCreateAPIView):
    queryset = Produto.objects.all()
    permission_classes = [IsAuthenticated]
    def get_serializer_class(self):
        if self.request.method == "POST":
            return ProdutoDetailsSerializer        
        return ProdutoListSerializer # GET because otherwise the LCAPIView will raise the exception.
    
class ProdutoDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Produto.objects.all()
    serializer_class = ProdutoDetailsSerializer