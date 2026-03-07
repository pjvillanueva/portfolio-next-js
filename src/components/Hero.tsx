"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Github, Linkedin, Mail, ExternalLink, Download } from "lucide-react";

export default function Hero() {
  useEffect(() => {
    // Ensure the display font is requested early (font-display is swap).
    void document.fonts?.load('500 64px "Bitcount Prop Double Ink"');
  }, []);

  const primaryLinks = [
    {
      name: "Contact Me",
      url: "#contact",
      icon: ExternalLink,
      variant: "primary" as const,
    },
    {
      name: "Download CV",
      url: "/Paul-James-Villanueva-CV.pdf",
      icon: Download,
      variant: "secondary" as const,
    },
  ];

  const dartCodeLines = [
    "import 'package:flutter/material.dart';",
    "",
    "void main() => runApp(MyApp());",
    "",
    "class MyApp extends StatelessWidget {",
    "  @override",
    "  Widget build(BuildContext context) {",
    "    return MaterialApp(",
    "      title: 'Flutter Demo',",
    "      theme: ThemeData(primarySwatch: Colors.blue),",
    "      home: Scaffold(",
    "        appBar: AppBar(title: Text('App')),",
    "        body: Center(",
    "          child: Column(",
    "            mainAxisAlignment: MainAxisAlignment.center,",
    "            children: [",
    "              Text('Hello World'),",
    "              SizedBox(height: 20),",
    "              ElevatedButton(",
    "                onPressed: () => setState(() {}),",
    "                child: Text('Press'),",
    "              ),",
    "            ],",
    "          ),",
    "        ),",
    "      ),",
    "    );",
    "  }",
    "}",
    "",
    "class _MyHomePageState extends State<MyHomePage> {",
    "  int _counter = 0;",
    "",
    "  void _incrementCounter() { setState(() { _counter++; }); }",
    "",
    "  @override",
    "  Widget build(BuildContext context) {",
    "    return Scaffold(",
    "      appBar: AppBar(title: Text('Home')),",
    "      body: ListView.builder(",
    "        itemCount: 100,",
    "        itemBuilder: (context, index) =>",
    "          ListTile(title: Text('Item \$index')),",
    "      ),",
    "      floatingActionButton: FloatingActionButton(",
    "        onPressed: _incrementCounter,",
    "        child: Icon(Icons.add),",
    "      ),",
    "    );",
    "  }",
    "}",
    "",
    "Widget buildButton() {",
    "  return ElevatedButton(",
    "    onPressed: () {},",
    "    child: Text('Submit'),",
    "  );",
    "}",
    "",
    "Future<void> fetchData() async {",
    "  final response = await http.get(url);",
    "  if (response.statusCode == 200) {",
    "    setState(() { data = jsonDecode(response.body); });",
    "  }",
    "}",
    "",
    "Container(",
    "  padding: EdgeInsets.all(16),",
    "  margin: EdgeInsets.symmetric(vertical: 8),",
    "  decoration: BoxDecoration(",
    "    color: Colors.white,",
    "    borderRadius: BorderRadius.circular(8),",
    "  ),",
    "  child: Text('Content'),",
    ")",
    "",
    "Navigator.push(context, MaterialPageRoute(",
    "  builder: (context) => DetailScreen(),",
    "));",
    "",
    "StreamBuilder<Data>(",
    "  stream: dataStream,",
    "  builder: (context, snapshot) {",
    "    if (snapshot.hasData) return Text(snapshot.data!.name);",
    "    return CircularProgressIndicator();",
    "  },",
    ")",
    "",
    "AnimationController(duration: Duration(seconds: 1), vsync: this)",
    "TweenAnimationBuilder<double>(",
    "  tween: Tween(begin: 0, end: 1),",
    "  builder: (context, value, child) => Opacity(opacity: value, child: child!),",
    ")",
    "",
    "MediaQuery.of(context).size.width",
    "Theme.of(context).primaryColor",
    "const SizedBox(height: 16)",
    "Flexible(child: Text('Flex'), flex: 1)",
    "Expanded(child: Container(color: Colors.blue))",
    "Padding(padding: EdgeInsets.all(8), child: child)",
    "Align(alignment: Alignment.center, child: child)",
    "Stack(children: [Positioned.fill(child: bg), Positioned(top: 0, child: fg)])",
    "GridView.builder(gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2), itemBuilder: ...)",
    "SingleChildScrollView(child: Column(children: [...]))",
    "Form(key: _formKey, child: Column(children: [TextField(...), ElevatedButton(...)]))",
    "TextFormField(validator: (v) => v!.isEmpty ? 'Required' : null)",
    "Scaffold(body: body, bottomNavigationBar: BottomNavigationBar(items: [...]))",
    "Drawer(child: ListView(children: [ListTile(title: Text('Menu'))]))",
    "TabBar(tabs: [Tab(text: 'Tab1'), Tab(text: 'Tab2')])",
    "TabBarView(children: [Widget1(), Widget2()])",
    "RefreshIndicator(onRefresh: () async {}, child: ListView(...))",
    "GestureDetector(onTap: () {}, child: widget)",
    "InkWell(onTap: () {}, child: widget)",
    "Dismissible(key: Key(id), onDismissed: (d) => delete(id), child: tile)",
    "Hero(tag: 'image', child: Image.network(url))",
    "AnimatedContainer(duration: Duration(milliseconds: 300), color: color)",
    "FadeTransition(opacity: animation, child: widget)",
    "SlideTransition(position: offset, child: widget)",
    "CustomScrollView(slivers: [SliverAppBar(), SliverList(...)])",
    "SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3)",
    "NestedScrollView(headerSliverBuilder: ..., body: ...)",
    "DefaultTextStyle(style: TextStyle(fontSize: 16), child: widget)",
    "InheritedWidget for theme/data",
    "Builder(builder: (context) => widget)",
    "LayoutBuilder(builder: (context, constraints) => ...)",
    "OrientationBuilder(builder: (context, orientation) => ...)",
    "ValueListenableBuilder(valueListenable: notifier, builder: (context, value, child) => ...)",
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/pjvillanueva",
      icon: Github,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/paul-james-villanueva",
      icon: Linkedin,
    },
    {
      name: "Email",
      url: "mailto:pjvillanueva819@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row md:items-center px-4 pt-14 pb-12 sm:px-6 sm:pt-16 md:px-8 md:pt-16 lg:px-10 lg:pt-20 lg:pb-20 bg-black overflow-hidden">
      {/* Futuristic gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black" />

        {/* Mobile: gradient rises from bottom to mid-screen */}
        <div className="absolute inset-0 md:hidden">
          <div
            className="absolute inset-x-0 bottom-0 h-[55%]"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(75,50,160,0.35) 45%, rgba(102,64,171,0.62) 72%, rgba(135,81,184,0.82) 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-[-10%] h-[62%]"
            style={{
              background:
                "radial-gradient(75% 70% at 82% 100%, rgba(236,72,153,0.45) 0%, rgba(236,72,153,0.2) 42%, rgba(236,72,153,0.06) 66%, rgba(0,0,0,0) 100%)",
              filter: "blur(28px)",
            }}
          />
          <div
            className="absolute inset-x-0 top-[42%] h-[38%]"
            style={{
              background:
                "radial-gradient(62% 62% at 88% 0%, rgba(30,58,138,0.44) 0%, rgba(30,58,138,0.18) 40%, rgba(30,58,138,0) 78%)",
              filter: "blur(26px)",
            }}
          />
        </div>

        {/* Desktop/tablet: right-side gradient */}
        <div className="absolute inset-0 hidden md:block">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(59,42,145,0) 0%, rgba(59,42,145,0) 60%, rgba(59,42,145,0.06) 66%, rgba(75,50,160,0.38) 76%, rgba(102,64,171,0.66) 88%, rgba(135,81,184,0.90) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(52% 72% at 90% 12%, rgba(15,23,68,0.72) 0%, rgba(30,58,138,0.34) 40%, rgba(30,58,138,0.12) 58%, rgba(30,58,138,0) 80%)",
              filter: "blur(30px)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(52% 72% at 84% 60%, rgba(236,72,153,0.50) 0%, rgba(236,72,153,0.24) 38%, rgba(236,72,153,0.08) 62%, rgba(0,0,0,0) 86%)",
              filter: "blur(28px)",
            }}
          />
        </div>
      </div>

      {/* Decorative circle - mobile: right block; tablet/small laptop: scaled; xl: full size */}
      <div
        className="pointer-events-none absolute z-[1] right-[5%] md:right-[8%] lg:right-[10%] xl:right-[12%] bottom-0 translate-y-[200px] flex items-center justify-center w-[min(100vmin,380px)] h-[min(100vmin,380px)] md:w-[calc(min(100vmin,420px)+50px)] md:h-[calc(min(100vmin,420px)+50px)] lg:w-[calc(min(120vmin,540px)+60px)] lg:h-[calc(min(120vmin,540px)+60px)] xl:w-[calc(min(140vmin,680px)+80px)] xl:h-[calc(min(140vmin,680px)+80px)]"
        aria-hidden
      >
        <div
          className="w-[min(100vmin,380px)] h-[min(100vmin,380px)] md:w-[min(100vmin,420px)] md:h-[min(100vmin,420px)] lg:w-[min(120vmin,540px)] lg:h-[min(120vmin,540px)] xl:w-[min(140vmin,680px)] xl:h-[min(140vmin,680px)] rounded-full shrink-0"
          style={{
            background: "linear-gradient(90deg, rgba(102, 64, 171, 0.22) 0%, rgba(147, 112, 219, 0.12) 50%, rgba(255, 182, 193, 0.1) 100%)",
          }}
        />
        {/* Border arc: visible from 2 to 9 o'clock, hidden from 9 to 2; 40px from circle */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          aria-hidden
        >
          <circle
            cx="50"
            cy="50"
            r="50"
            fill="none"
            stroke="rgba(147,112,219,0.5)"
            strokeWidth="0.3"
            strokeLinecap="round"
            strokeDasharray="230.26 130.9"
            strokeDashoffset="40.4"
          />
        </svg>
      </div>

      {/* Rolling Dart/Flutter code effect - mobile: bottom half, centered; md+: full height, right */}
      <div
        className="absolute z-[5] left-1/2 translate-x-[calc(-50%+150px)] md:left-auto md:translate-x-0 md:right-0 md:translate-x-[40px] lg:translate-x-[50px] xl:translate-x-[60px] bottom-0 flex items-end justify-center pointer-events-none overflow-hidden h-[50vh] md:h-screen"
        style={{
          width: "calc(min(180vmin, 920px) + 80px)",
        }}
        aria-hidden
      >
        <div
          className="w-[min(180vmin,920px)] h-full min-h-[min(145vmin,750px)] flex flex-col justify-end overflow-hidden pt-4 md:pt-16 lg:pt-[100px]"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, transparent 7%, black 7%, black 98%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, transparent 7%, black 7%, black 98%, transparent 100%)",
          }}
        >
          <div
            className="animate-code-roll flex flex-col gap-3 font-mono text-slate-600/80 px-3 py-2 text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px]"
            style={{ height: "400%", lineHeight: 1.6 }}
          >
            {[...Array(4)].map((_, block) => (
              <span key={block} className="flex flex-col gap-2">
                {dartCodeLines.map((line, i) => (
                  <span key={`${block}-${i}`} className={line === "" ? "whitespace-pre block min-h-[1.6em]" : "whitespace-pre"}>{line || " "}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Portrait - mobile: smaller, centered; md+: right-aligned, scaled for tablet/small laptop */}
      <div
        className="absolute z-[30] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 right-[5%] md:right-[8%] lg:right-[10%] xl:right-[12%] bottom-0 flex items-end justify-center pointer-events-none w-[min(85vmin,320px)] h-[min(85vmin,320px)] md:w-[calc(min(95vmin,440px)+50px)] md:h-[calc(min(95vmin,440px)+50px)] lg:w-[calc(min(115vmin,580px)+60px)] lg:h-[calc(min(115vmin,580px)+60px)] xl:w-[calc(min(140vmin,680px)+80px)] xl:h-[calc(min(140vmin,680px)+80px)]"
      >
        <div className="relative w-full h-full md:w-[min(95vmin,440px)] md:h-[min(95vmin,440px)] lg:w-[min(120vmin,620px)] lg:h-[min(120vmin,620px)] xl:w-[min(145vmin,750px)] xl:h-[min(145vmin,750px)] shrink-0 overflow-hidden rounded-t-[min(42.5vmin,160px)] md:rounded-t-[min(47.5vmin,220px)] lg:rounded-t-[min(60vmin,310px)] xl:rounded-t-[min(72.5vmin,375px)]">
          <Image
            src="/paul_portrait.png"
            alt="Paul James Villanueva"
            fill
            priority
            sizes="(max-width: 768px) 87vmin, (max-width: 1024px) 440px, (max-width: 1280px) 620px, 750px"
            className="object-contain object-center"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-[1.2fr_minmax(0,1fr)] gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-start md:items-center py-0 md:py-12 lg:py-16 xl:py-20 order-1">
        {/* Left content - on top on mobile, left column on desktop */}
        <div className="text-center md:text-left">
          <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-slate-400 mb-3 animate-fade-in-up mt-[50px] lg:mt-0">
            <span className="md:hidden">Full-Stack<br />Web/Mobile Developer</span>
            <span className="hidden md:inline whitespace-nowrap">Full-Stack Web/Mobile Developer</span>
          </p>
          <h1
            className="hero-headline bg-name-glimmer animate-name-glimmer mb-4"
            style={{ opacity: 1, transform: "none" }}
          >
            <span className="whitespace-nowrap">PAUL JAMES</span>
            <br />
            VILLANUEVA
          </h1>
          <div className="flex gap-4 mb-6 md:mb-8 animate-fade-in-up animate-delay-100 justify-center md:justify-start">
            <div className="shrink-0 w-px self-stretch bg-slate-500 hidden sm:block" aria-hidden />
            <p className="text-sm sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0">
              I’m a full-stack software developer specializing in Flutter and web
              development, building high-quality apps and platforms for web and
              mobile.
            </p>
          </div>

          {/* Primary CTA buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 mb-6 animate-fade-in-up animate-delay-200">
            {primaryLinks.map((link, index) => {
              const Icon = link.icon;
              const isPrimary = link.variant === "primary";
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.name === "Download CV" ? undefined : link.url.startsWith("http") ? "_blank" : undefined}
                  rel={link.name === "Download CV" ? undefined : link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  download={link.name === "Download CV" ? "Paul-James-Villanueva-CV.pdf" : undefined}
                  className={`inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300 ${
                    isPrimary
                      ? "bg-accent-gradient text-white shadow-lg shadow-[var(--accent-pink)]/40 hover:shadow-[var(--accent-pink)]/60 hover:-translate-y-0.5"
                      : "border border-slate-700/70 bg-slate-900/60 text-slate-100 hover:border-[var(--accent-pink)] hover:text-[var(--accent-pink)] hover:bg-slate-900 shadow-sm hover:shadow-[var(--accent-pink)]/30"
                  }`}
                  style={{ animationDelay: `${0.25 + index * 0.05}s` }}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Mobile only: spacer so right-side (circle/code/portrait) sits below left content */}
        <div className="min-h-[42vh] w-full relative md:hidden order-2" aria-hidden />
      </div>

      {/* Social row - mobile only: bottom center of screen, on top of image (no extra space) */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-[40] flex justify-center items-center gap-4 animate-fade-in-up animate-delay-300 lg:hidden">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-transparent text-slate-200 hover:text-white hover:border-white/70 transition-all"
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
            </a>
          );
        })}
      </div>

      {/* Social bar - right side, vertically centered within hero (tablet and desktop) */}
      <div className="absolute right-4 md:right-5 lg:right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-4 animate-fade-in-up animate-delay-300">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-transparent text-slate-200 hover:text-white hover:border-white/70 transition-all"
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
            </a>
          );
        })}
      </div>
    </section>
  );
}

