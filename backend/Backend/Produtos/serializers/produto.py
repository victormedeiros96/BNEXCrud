from rest_framework import serializers
from Produtos.models.produto import Produto

class ProdutoDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'
        
class ProdutoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = ['id','nome']
