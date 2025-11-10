import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  category: string;
  image: string;
  inStock: boolean;
}

const Index = () => {
  const { toast } = useToast();
  const [vinCode, setVinCode] = useState('');
  const [vinResult, setVinResult] = useState<any>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = [
    { name: 'Двигатель', icon: 'Cog', count: 245 },
    { name: 'Тормоза', icon: 'Disc', count: 189 },
    { name: 'Подвеска', icon: 'Wrench', count: 312 },
    { name: 'Электрика', icon: 'Zap', count: 156 },
    { name: 'Фильтры', icon: 'Filter', count: 98 },
    { name: 'Масла', icon: 'Droplet', count: 76 }
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'Масляный фильтр Mann W 712/75',
      price: 890,
      brand: 'Mann',
      category: 'Фильтры',
      image: 'https://cdn.poehali.dev/projects/1b83483a-8932-4df9-aa29-a68388e56022/files/4d3fb4fb-6a20-4b16-a9dd-4b46ce9e1eed.jpg',
      inStock: true
    },
    {
      id: 2,
      name: 'Тормозные колодки Brembo P 85 020',
      price: 3250,
      brand: 'Brembo',
      category: 'Тормоза',
      image: 'https://cdn.poehali.dev/projects/1b83483a-8932-4df9-aa29-a68388e56022/files/49757738-5114-4b53-9f23-356952e05ed1.jpg',
      inStock: true
    },
    {
      id: 3,
      name: 'Свечи зажигания NGK 4644',
      price: 520,
      brand: 'NGK',
      category: 'Двигатель',
      image: 'https://cdn.poehali.dev/projects/1b83483a-8932-4df9-aa29-a68388e56022/files/4d3fb4fb-6a20-4b16-a9dd-4b46ce9e1eed.jpg',
      inStock: true
    },
    {
      id: 4,
      name: 'Воздушный фильтр Bosch 1 457 433 529',
      price: 1150,
      brand: 'Bosch',
      category: 'Фильтры',
      image: 'https://cdn.poehali.dev/projects/1b83483a-8932-4df9-aa29-a68388e56022/files/49757738-5114-4b53-9f23-356952e05ed1.jpg',
      inStock: true
    },
    {
      id: 5,
      name: 'Амортизатор передний Sachs 312 453',
      price: 4890,
      brand: 'Sachs',
      category: 'Подвеска',
      image: 'https://cdn.poehali.dev/projects/1b83483a-8932-4df9-aa29-a68388e56022/files/4d3fb4fb-6a20-4b16-a9dd-4b46ce9e1eed.jpg',
      inStock: true
    },
    {
      id: 6,
      name: 'Моторное масло Castrol 5W-40 4L',
      price: 2750,
      brand: 'Castrol',
      category: 'Масла',
      image: 'https://cdn.poehali.dev/projects/1b83483a-8932-4df9-aa29-a68388e56022/files/49757738-5114-4b53-9f23-356952e05ed1.jpg',
      inStock: true
    }
  ];

  const handleVinDecode = () => {
    if (vinCode.length !== 17) {
      toast({
        title: 'Ошибка',
        description: 'VIN-код должен содержать 17 символов',
        variant: 'destructive'
      });
      return;
    }

    setVinResult({
      brand: 'Toyota',
      model: 'Camry',
      year: 2018,
      engine: '2.5L',
      parts: [
        { name: 'Масляный фильтр Toyota 90915-YZZF2', price: 680, id: 101 },
        { name: 'Воздушный фильтр Toyota 17801-0H050', price: 890, id: 102 },
        { name: 'Салонный фильтр Toyota 87139-50060', price: 750, id: 103 }
      ]
    });

    toast({
      title: 'VIN-код расшифрован',
      description: 'Найдены подходящие запчасти для вашего автомобиля'
    });
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        quantity: 1,
        image: product.image
      }]);
    }

    toast({
      title: 'Добавлено в корзину',
      description: product.name
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-secondary text-secondary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Car" className="text-primary-foreground" size={24} />
              </div>
              <h1 className="text-2xl font-bold">АвтоЗапчасти</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="hover:text-primary transition-colors">Каталог</a>
              <a href="#brands" className="hover:text-primary transition-colors">Бренды</a>
              <a href="#vin" className="hover:text-primary transition-colors">VIN-декодер</a>
              <a href="#delivery" className="hover:text-primary transition-colors">Доставка</a>
              <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Search" size={20} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {isCartOpen && (
        <div className="fixed right-0 top-[72px] w-96 h-[calc(100vh-72px)] bg-card shadow-2xl z-40 animate-slide-in-right overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Корзина</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Корзина пуста</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1">
                            <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                            <p className="text-primary font-bold mt-1">{item.price} ₽</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => {
                                  if (item.quantity > 1) {
                                    setCart(cart.map(i => 
                                      i.id === item.id ? {...i, quantity: i.quantity - 1} : i
                                    ));
                                  } else {
                                    setCart(cart.filter(i => i.id !== item.id));
                                  }
                                }}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setCart(cart.map(i => 
                                    i.id === item.id ? {...i, quantity: i.quantity + 1} : i
                                  ));
                                }}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-4">
                    <span className="text-lg font-semibold">Итого:</span>
                    <span className="text-2xl font-bold text-primary">{cartTotal} ₽</span>
                  </div>
                  <Button className="w-full" size="lg">
                    Оформить заказ
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <section 
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(249, 115, 22, 0.95), rgba(14, 165, 233, 0.95)), url('https://cdn.poehali.dev/projects/1b83483a-8932-4df9-aa29-a68388e56022/files/94b25fd9-bae2-4dfc-b796-fabe986969d3.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white animate-fade-in">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">Акция до конца месяца</Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Автозапчасти<br />с доставкой за 2 часа
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Оригинальные запчасти для всех марок авто. Гарантия качества и низкие цены.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg">
                <Icon name="Search" className="mr-2" />
                Подобрать запчасти
              </Button>
              <Button size="lg" variant="outline" className="text-lg bg-white/10 border-white text-white hover:bg-white/20">
                <Icon name="Phone" className="mr-2" />
                Позвонить нам
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Популярные категории</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card 
                key={index} 
                className="hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={category.icon as any} className="text-primary" size={32} />
                  </div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} товаров</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="vin" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="ScanBarcode" className="text-accent" size={32} />
                </div>
                <CardTitle className="text-3xl">VIN-декодер</CardTitle>
                <CardDescription className="text-lg">
                  Введите VIN-код автомобиля для подбора подходящих запчастей
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 mb-6">
                  <Input
                    placeholder="Введите 17-значный VIN-код"
                    value={vinCode}
                    onChange={(e) => setVinCode(e.target.value.toUpperCase())}
                    maxLength={17}
                    className="text-lg"
                  />
                  <Button onClick={handleVinDecode} size="lg" className="px-8">
                    <Icon name="Search" className="mr-2" />
                    Найти
                  </Button>
                </div>

                {vinResult && (
                  <div className="animate-fade-in">
                    <Card className="bg-muted/50 mb-6">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4">Информация об автомобиле</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Марка</p>
                            <p className="font-semibold text-lg">{vinResult.brand}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Модель</p>
                            <p className="font-semibold text-lg">{vinResult.model}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Год</p>
                            <p className="font-semibold text-lg">{vinResult.year}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Двигатель</p>
                            <p className="font-semibold text-lg">{vinResult.engine}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <h3 className="text-xl font-bold mb-4">Рекомендуемые запчасти</h3>
                    <div className="space-y-3">
                      {vinResult.parts.map((part: any) => (
                        <Card key={part.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold">{part.name}</h4>
                                <p className="text-primary font-bold text-lg mt-1">{part.price} ₽</p>
                              </div>
                              <Button onClick={() => addToCart({
                                id: part.id,
                                name: part.name,
                                price: part.price,
                                brand: vinResult.brand,
                                category: 'Фильтры',
                                image: 'https://cdn.poehali.dev/projects/1b83483a-8932-4df9-aa29-a68388e56022/files/4d3fb4fb-6a20-4b16-a9dd-4b46ce9e1eed.jpg',
                                inStock: true
                              })}>
                                <Icon name="ShoppingCart" className="mr-2" size={18} />
                                В корзину
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Популярные товары</h2>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="filters">Фильтры</TabsTrigger>
              <TabsTrigger value="brakes">Тормоза</TabsTrigger>
              <TabsTrigger value="engine">Двигатель</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Card 
                key={product.id} 
                className="hover:shadow-2xl transition-all hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-3 right-3 bg-green-500">В наличии</Badge>
                  </div>
                  <div className="p-6">
                    <Badge variant="outline" className="mb-2">{product.brand}</Badge>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">{product.name}</h3>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                      <Button onClick={() => addToCart(product)}>
                        <Icon name="ShoppingCart" className="mr-2" size={18} />
                        Купить
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Показать ещё товары
              <Icon name="ChevronDown" className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Преимущества</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Truck" className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Быстрая доставка</h3>
                <p className="text-muted-foreground">Доставим заказ за 2 часа по городу или на следующий день по России</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" className="text-accent" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Гарантия качества</h3>
                <p className="text-muted-foreground">Только оригинальные запчасти с официальной гарантией производителя</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Percent" className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">Выгодные цены</h3>
                <p className="text-muted-foreground">Лучшие цены на рынке благодаря прямым поставкам от производителей</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer id="contacts" className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Car" className="text-primary-foreground" size={24} />
                </div>
                <h3 className="text-xl font-bold">АвтоЗапчасти</h3>
              </div>
              <p className="text-secondary-foreground/80">Надёжный поставщик автозапчастей с 2010 года</p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Каталог</h4>
              <ul className="space-y-2 text-secondary-foreground/80">
                <li><a href="#" className="hover:text-primary transition-colors">Двигатель</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Тормозная система</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Подвеска</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Электрика</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Информация</h4>
              <ul className="space-y-2 text-secondary-foreground/80">
                <li><a href="#" className="hover:text-primary transition-colors">О компании</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Доставка и оплата</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Гарантии</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-3 text-secondary-foreground/80">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={18} />
                  <a href="tel:+78005553535" className="hover:text-primary transition-colors">8 (800) 555-35-35</a>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={18} />
                  <a href="mailto:info@avtozap.ru" className="hover:text-primary transition-colors">info@avtozap.ru</a>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={18} />
                  <span>Москва, ул. Автозаводская, 23</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-secondary-foreground/60">
            <p>&copy; 2024 АвтоЗапчасти. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
