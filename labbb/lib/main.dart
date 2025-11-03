import 'dart:async';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lottie/lottie.dart'; // 🔹 Lottie импорт

void main() {
  runApp(const BasketballDemoApp());
}

class BasketballDemoApp extends StatelessWidget {
  const BasketballDemoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Basketball Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF0D0D0D),
        appBarTheme: const AppBarTheme(
          backgroundColor: Color(0xFF1A1A1A),
          foregroundColor: Colors.white,
          centerTitle: true,
        ),
        bottomNavigationBarTheme: const BottomNavigationBarThemeData(
          backgroundColor: Color(0xFF1A1A1A),
          selectedItemColor: Colors.deepOrangeAccent,
          unselectedItemColor: Colors.white70,
        ),
        textTheme: GoogleFonts.notoSansTextTheme(
          Theme.of(context).textTheme,
        ),
      ),
      home: const LoginPage(),
    );
  }
}

// ===================== LOGIN PAGE =====================
class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController _userController = TextEditingController();
  final TextEditingController _passController = TextEditingController();
  String? _errorMessage;

  void _login() {
    String user = _userController.text.trim();
    String pass = _passController.text.trim();

    if (user == 'admin' && pass == '1234') {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => const HomeBasketPage()),
      );
    } else {
      setState(() {
        _errorMessage = '❌ Хэрэглэгчийн нэр эсвэл нууц үг буруу байна!';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Lottie.network(
                'https://lottie.host/1101ebcc-6b3a-4aa5-bf7c-228749f915c7/VQvFStYy8g.json',
                width: 150,
                height: 150,
                fit: BoxFit.cover,
              ),
              const SizedBox(height: 50),
              const Text(
                '🏀 Basketball Zone',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 30),
              TextField(
                controller: _userController,
                style: const TextStyle(color: Colors.white),
                decoration: InputDecoration(
                  labelText: 'Хэрэглэгчийн нэр',
                  labelStyle: const TextStyle(color: Colors.white70),
                  filled: true,
                  fillColor: const Color(0xFF1A1A1A),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              TextField(
                controller: _passController,
                obscureText: true,
                style: const TextStyle(color: Colors.white),
                decoration: InputDecoration(
                  labelText: 'Нууц үг',
                  labelStyle: const TextStyle(color: Colors.white70),
                  filled: true,
                  fillColor: const Color(0xFF1A1A1A),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              if (_errorMessage != null)
                Text(
                  _errorMessage!,
                  style: const TextStyle(color: Colors.redAccent, fontSize: 13),
                ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _login,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.deepOrangeAccent,
                  padding: const EdgeInsets.symmetric(horizontal: 60, vertical: 14),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: const Text(
                  'НЭВТРЭХ',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ===================== HOME PAGE =====================
class HomeBasketPage extends StatefulWidget {
  const HomeBasketPage({super.key});

  @override
  State<HomeBasketPage> createState() => _HomeBasketPageState();
}

class _HomeBasketPageState extends State<HomeBasketPage> {
  int _currentIndex = 0;
  final PageController _pageController = PageController();
  int _currentBanner = 0;
  Timer? _timer;

  final List<Map<String, String>> banners = const [
    {
      'title': '🔥 Lakers vs Celtics',
      'desc': 'Леброн vs Тэйтум — гайхалтай тоглолт',
      'image': 'assets/images/banner1.jpg',
    },
    {
      'title': '🏀 Dunk Contest',
      'desc': 'Шинэ аварга тодорлоо!',
      'image': 'assets/images/banner2.jpg',
    },
    {
      'title': '⛹️ NBA All-Stars',
      'desc': '2025 оны шилдэг тоглогчид тодорлоо',
      'image': 'assets/images/banner3.jpg',
    },
    {
      'title': '🏀Curry 45 оноо авч Warriors ялалт байгууллаа',
      'desc': 'Curry-ийн гайхалтай тоглолтоор Warriors Lakers-ийг хожлоо.',
      'image': 'assets/images/news1.jpg',
    },
  ];

  final List<Map<String, String>> _newsList = [
    {
      'title': 'Curry 45 оноо авч Warriors ялалт байгууллаа',
      'subtitle': 'Curry-ийн гайхалтай тоглолтоор Warriors Lakers-ийг хожлоо.',
      'image': 'assets/images/news1.jpg',
    },
    {
      'title': 'LeBron шинэ дээд амжилт тогтоолоо',
      'subtitle': 'LeBron 39 насандаа дахин 40 оноо авч фэнүүдээ гайхшруулав.',
      'image': 'assets/images/news2.jpg',
    },
    {
      'title': 'Giannis трипл-дабл хийв',
      'subtitle':
          'Bucks багийн довтлогч 32 оноо, 14 самбар, 10 дамжуулалт гүйцэтгэлээ.',
      'image': 'assets/images/news3.jpg',
    },
    {
      'title': 'Doncic 50 оноогоор Mavericks-ийг аварлаа',
      'subtitle':
          'Luka Doncic clutch цагт 3 онооны шидэлт амжилттай болголоо.',
      'image': 'assets/images/news4.jpg',
    },
    {
      'title': 'Kevin Durant 10,000 дамжуулалт гүйцэтгэлээ',
      'subtitle': 'Durant карьерийнхээ шинэ milestone-д хүрэв.',
      'image': 'assets/images/news5.jpg',
    },
    {
      'title': 'Nikola Jokic 20 дамжуулалт хийжээ',
      'subtitle': 'Jokic Nuggets-ийг triple-double амжилтаар удирдав.',
      'image': 'assets/images/news6.jpg',
    },
    {
      'title': 'Tatum 3 онооны шидэлтээр ялалт авчирлаа',
      'subtitle': 'Celtics баг clutch мөчид ялалт байгуулсан байна.',
      'image': 'assets/images/news7.jpg',
    },
    {
      'title': 'Morant эргэн ирлээ!',
      'subtitle':
          'Ja Morant гэмтлээсээ эдгэрч, анхны тоглолтондоо 28 оноо авлаа.',
      'image': 'assets/images/news8.jpg',
    },
    {
      'title': 'Stephen Curry MVP нэр дэвшигчдийн жагсаалтад тэргүүлж байна',
      'subtitle': 'NBA улирлын дундаас Curry хамгийн өндөр үнэлгээ авч байна.',
      'image': 'assets/images/news9.jpg',
    },
    {
      'title': 'All-Star 2025-д Kobe-д зориулсан хүндэтгэлийн тоглолт болно',
      'subtitle': 'NBA All-Star 2025 Kobe Bryant-ийн дурсгалд зориулагдана.',
      'image': 'assets/images/news10.jpg',
    },
  ];

  @override
  void initState() {
    super.initState();
    _timer = Timer.periodic(const Duration(seconds: 3), (timer) {
      if (_pageController.hasClients) {
        int nextPage = (_currentBanner + 1) % banners.length;
        _pageController.animateToPage(
          nextPage,
          duration: const Duration(milliseconds: 600),
          curve: Curves.easeInOut,
        );
        setState(() => _currentBanner = nextPage);
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final pages = [_buildHomePage(), _buildNewsPage(), _buildProfilePage()];
    return Scaffold(
      appBar: AppBar(
        title: const Text("🏀 Basketball Zone"),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout, color: Colors.deepOrangeAccent),
            onPressed: () {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (_) => const LoginPage()),
              );
            },
          )
        ],
      ),
      body: pages[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
  currentIndex: _currentIndex,
  onTap: (index) => setState(() => _currentIndex = index),
  items: const [
    BottomNavigationBarItem(
      icon: SizedBox.shrink(), // хоосон icon
      label: "Нүүр",
    ),
    BottomNavigationBarItem(
      icon: SizedBox.shrink(),
      label: "Мэдээ",
    ),
    BottomNavigationBarItem(
      icon: SizedBox.shrink(),
      label: "Тоглогч",
    ),
  ],
),

    );
  }

  // ===================== HOME PAGE =====================
  Widget _buildHomePage() {
    return SingleChildScrollView(
      child: Column(
        children: [
          const SizedBox(height: 12),
          SizedBox(
            height: 260,
            child: PageView.builder(
              controller: _pageController,
              itemCount: banners.length,
              itemBuilder: (context, idx) {
                final b = banners[idx];
                return _BannerCard(
                  title: b['title']!,
                  desc: b['desc']!,
                  assetImagePath: b['image']!,
                );
              },
            ),
          ),
          const SizedBox(height: 10),
          ..._newsList.map((n) => Card(
                color: const Color(0xFF1A1A1A),
                margin: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
                child: ListTile(
                  leading: ClipRRect(
                    borderRadius: BorderRadius.circular(10),
                    child: Image.asset(n['image']!,
                        width: 70, height: 70, fit: BoxFit.cover),
                  ),
                  title: Text(n['title']!,
                      style: const TextStyle(
                          color: Colors.white, fontWeight: FontWeight.bold)),
                  subtitle: Text(n['subtitle']!,
                      style: const TextStyle(color: Colors.white70, fontSize: 13)),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => NewsDetailPage(
                          title: n['title']!,
                          subtitle: n['subtitle']!,
                          image: n['image']!,
                        ),
                      ),
                    );
                  },
                ),
              )),
        ],
      ),
    );
  }

  Widget _buildNewsPage() => ListView.builder(
        itemCount: _newsList.length,
        padding: const EdgeInsets.all(12),
        itemBuilder: (context, i) {
          final n = _newsList[i];
          return Card(
            color: const Color(0xFF1A1A1A),
            margin: const EdgeInsets.symmetric(vertical: 8),
            child: ListTile(
              leading: Image.asset(n['image']!, width: 70, height: 70, fit: BoxFit.cover),
              title: Text(n['title']!, style: const TextStyle(color: Colors.white)),
              subtitle: Text(n['subtitle']!, style: const TextStyle(color: Colors.white70)),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => NewsDetailPage(
                      title: n['title']!,
                      subtitle: n['subtitle']!,
                      image: n['image']!,
                    ),
                  ),
                );
              },
            ),
          );
        },
      );

  // ===================== PROFILE PAGE =====================
  Widget _buildProfilePage() {
    final List<Map<String, dynamic>> players = [
      {
        'name': 'LeBron James',
        'team': 'Los Angeles Lakers',
        'avatar': 'assets/images/player1.webp',
        'points': '27.4',
        'rebounds': '7.3',
        'assists': '7.1',
      },
      {
        'name': 'Stephen Curry',
        'team': 'Golden State Warriors',
        'avatar': 'assets/images/player2.webp',
        'points': '30.2',
        'rebounds': '5.4',
        'assists': '6.8',
      },
       {
        'name': 'Giannis Antetokounmpo',
        'team': 'Milwaukee Bucks',
        'avatar': 'assets/images/player3.webp',
        'points': '28.7',
        'rebounds': '11.2',
        'assists': '5.9',
        'steals': '1.3',
        'blocks': '1.1',
        'recentGames': [
          {'opponent': 'Warriors', 'points': '32', 'rebounds': '14', 'assists': '6'},
          {'opponent': 'Celtics', 'points': '29', 'rebounds': '12', 'assists': '5'},
        ],
      },
      {
        'name': 'Luka Doncic',
        'team': 'Dallas Mavericks',
        'avatar': 'assets/images/player4.webp',
        'points': '29.5',
        'rebounds': '8.3',
        'assists': '8.6',
        'steals': '1.1',
        'blocks': '0.5',
        'recentGames': [
          {'opponent': 'Bucks', 'points': '50', 'rebounds': '9', 'assists': '10'},
          {'opponent': 'Lakers', 'points': '33', 'rebounds': '7', 'assists': '8'},
        ],
      },
      {
        'name': 'Kevin Durant',
        'team': 'Brooklyn Nets',
        'avatar': 'assets/images/player5.webp',
        'points': '29.1',
        'rebounds': '7.5',
        'assists': '5.4',
        'steals': '0.9',
        'blocks': '1.0',
        'recentGames': [
          {'opponent': 'Celtics', 'points': '38', 'rebounds': '8', 'assists': '6'},
          {'opponent': 'Warriors', 'points': '36', 'rebounds': '7', 'assists': '5'},
        ],
      },
    ];

    Map<String, dynamic> selectedPlayer = players[0];

    return StatefulBuilder(builder: (context, setState) {
      return SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            DropdownButton<Map<String, dynamic>>(
              value: selectedPlayer,
              dropdownColor: const Color(0xFF1A1A1A),
              iconEnabledColor: Colors.deepOrangeAccent,
              items: players.map((p) {
                return DropdownMenuItem<Map<String, dynamic>>(
                  value: p,
                  child: Text(p['name'], style: const TextStyle(color: Colors.white)),
                );
              }).toList(),
              onChanged: (player) {
                setState(() {
                  selectedPlayer = player!;
                });
              },
            ),
            const SizedBox(height: 16),
            CircleAvatar(
              radius: 50,
              backgroundImage: AssetImage(selectedPlayer['avatar']),
            ),
            const SizedBox(height: 12),
            Text(selectedPlayer['name'],
                style: const TextStyle(
                    color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
            Text(selectedPlayer['team'],
                style: const TextStyle(color: Colors.white70, fontSize: 16)),
            const SizedBox(height: 24),
            Center(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _buildLottieStatCard('Points', selectedPlayer['points']),
                  const SizedBox(width: 16),
                  _buildLottieStatCard('Rebounds', selectedPlayer['rebounds']),
                ],
              ),
            ),
            const SizedBox(height: 16),
            _buildLottieStatCard('Assists', selectedPlayer['assists']),
          ],
        ),
      );
    });
  }

  // ===================== LOTTIE STAT CARD =====================
  Widget _buildLottieStatCard(String title, String value) {
    return SizedBox(
      width: 120,
      height: 120,
      child: Stack(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(14),
            child: Lottie.network(
              'https://lottie.host/3b49aa4a-3ffe-4cda-bcea-75cc6c68d463/wH82alujZx.json',
              width: 120,
              height: 120,
              fit: BoxFit.cover,
              repeat: true,
            ),
          ),
          Container(
            decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.4),
              borderRadius: BorderRadius.circular(14),
            ),
          ),
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(title,
                    style: const TextStyle(
                        color: Colors.white, fontWeight: FontWeight.bold)),
                const SizedBox(height: 6),
                Text(value,
                    style: const TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.bold)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// ===================== BANNER CARD =====================
class _BannerCard extends StatelessWidget {
  final String title, desc, assetImagePath;
  const _BannerCard({required this.title, required this.desc, required this.assetImagePath});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 14),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        image: DecorationImage(
          image: AssetImage(assetImagePath),
          fit: BoxFit.cover,
          colorFilter:
              ColorFilter.mode(Colors.black.withOpacity(0.3), BlendMode.darken),
        ),
      ),
      padding: const EdgeInsets.all(20),
      alignment: Alignment.bottomLeft,
      child: Text("$title\n$desc",
          style: const TextStyle(
              color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
    );
  }
}

// ===================== NEWS DETAIL PAGE =====================
class NewsDetailPage extends StatelessWidget {
  final String title;
  final String subtitle;
  final String image;

  const NewsDetailPage({
    super.key,
    required this.title,
    required this.subtitle,
    required this.image,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Мэдээ дэлгэрэнгүй'),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Image.asset(image, fit: BoxFit.cover),
            const SizedBox(height: 12),
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title,
                      style: const TextStyle(
                          fontSize: 22, 
                          fontWeight: FontWeight.bold,
                          color: Colors.white
                          
                          )),
                  const SizedBox(height: 8),
                  Text(subtitle, style: const TextStyle(
                    fontSize: 16,
                    color: Colors.amber
                    )),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
