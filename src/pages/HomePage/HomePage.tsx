import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getUUID } from "@/lib/utils"

import { ReactComponent as GitHubIcon } from "@/assets/icons/icon_github.svg"
import { Bell, BookOpen, Calendar, PenTool, Search } from "lucide-react"

import { ReactComponent as MathCatLogo } from "@/assets/logo/MathCat_Full.svg"

const Home = (): React.JSX.Element => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="mb-8">
            <div className="flex justify-center items-center mb-4">
              <MathCatLogo />
            </div>
            <p className="text-xl text-blue-200 mb-8">一個專為自學數學的平台</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Input
                type="text"
                placeholder="搜尋數學公式、概念或題目..."
                className="w-full px-6 py-4 text-lg rounded-full border-2 border-blue-400/30 bg-slate-800/50 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              />
              <Button
                size="sm"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full bg-blue-600 hover:bg-blue-700"
              >
                <Search className="w-4 h-4 mr-1" />
                搜尋
              </Button>
            </div>
          </div>

          {/* 公告預覽區域 - 移到搜尋欄下方 */}
          <section className="mb-16">
            <Card className="bg-slate-800/50 border-blue-400/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    最新公告
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300" asChild>
                    <a href="/announcements">更多 →</a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      title: "系統維護通知",
                      date: "2025-01-02",
                      preview: "系統將於本週末進行例行維護，預計影響時間...",
                    },
                    {
                      title: "新功能上線",
                      date: "2025-01-01",
                      preview: "我們很高興宣布 LaTeX 編輯器新增了更多功能...",
                    },
                    {
                      title: "每日一題活動開始",
                      date: "2024-12-30",
                      preview: "全新的每日一題挑戰活動正式開始，歡迎大家參與...",
                    },
                  ].map((announcement, i) => (
                    <div
                      key={getUUID()}
                      className="p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer text-left"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-white font-medium text-left">{announcement.title}</h4>
                        <span className="text-xs text-slate-400">{announcement.date}</span>
                      </div>
                      <p className="text-blue-200 text-sm text-left">{announcement.preview}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 快速功能入口 */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="bg-slate-800/50 border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">題庫</h3>
                <p className="text-blue-200 mb-4">豐富的數學題目練習</p>
                <Button className="bg-green-600 hover:bg-green-700" asChild>
                  <a href="/problems">開始練習</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">每日一題</h3>
                <p className="text-blue-200 mb-4">每天挑戰一道精選題目</p>
                <Button className="bg-orange-600 hover:bg-orange-700" asChild>
                  <a href="/daily-problem">今日挑戰</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <PenTool className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">觀念學習</h3>
                <p className="text-blue-200 mb-4">系統化的數學概念</p>
                <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                  <a href="/concepts">開始學習</a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 分類 Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-white mb-8">分類</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {Array.from({ length: 10 }).map((_, i) => (
                <Card
                  key={getUUID()}
                  className="aspect-square hover:shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer transform bg-slate-800/50 border-blue-400/20 hover:border-blue-400/40"
                >
                  <CardContent className="flex items-center justify-center h-full">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-lg" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-blue-200 mt-4">可以選擇已經編輯/學習的概念/項目</p>
          </section>

          {/* 問題 Section */}
          <section className="mb-16">
            <div className="max-w-2xl mx-auto">
              <div className="bg-slate-800/50 border-blue-400/20 border rounded-lg p-8 shadow-lg mb-4">
                  <div className="w-full h-48 bg-slate-700/50 rounded-lg mb-4" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">問題</h3>
                <p className="text-blue-200 mb-4">
                  <span className="font-semibold">簡單feature介紹</span>
                </p>
                <Input
                  placeholder="搜尋問題"
                  className="max-w-md mx-auto bg-slate-800/50 border-blue-400/30 text-white placeholder:text-blue-200 focus:border-blue-400"
                />
              </div>
            </div>
          </section>

          {/* 觀念 Section */}
          <section className="mb-16">
            <div className="max-w-2xl mx-auto">
              <div className="bg-slate-800/50 border-blue-400/20 border rounded-lg p-8 shadow-lg mb-4">
                <div className="w-full h-48 bg-slate-700/50 rounded-lg mb-4" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">觀念</h3>
                <p className="text-blue-200 mb-4">
                  <span className="font-semibold">簡潔feature介紹</span>
                </p>
                <Input
                  placeholder="搜尋觀念"
                  className="max-w-md mx-auto bg-slate-800/50 border-blue-400/30 text-white placeholder:text-blue-200 focus:border-blue-400"
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800/50 backdrop-blur-sm border-t border-blue-400/20 py-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-center space-x-6">
          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <title>Discord</title>
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189Z" />
            </svg>
          </Button>
          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
            <GitHubIcon className="w-5 h-5" style={{ fill: "currentColor" }} />
          </Button>
          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
            <a href="/about">關於我們</a>
          </Button>
        </div>
        <div className="text-center mt-4">
          <p className="text-blue-200 text-sm">© 2025 MathHub. 讓數學學習變得更美好。</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
