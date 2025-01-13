import { useSettings } from "@/hooks/use-settings";
import Link from "next/link";
// 建站日期统计
const siteDateStatistics = (startDate: Date) => {
  const currentDate = new Date();
  const differenceInTime = currentDate.getTime() - startDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  const differenceInMonths = differenceInDays / 30;
  const differenceInYears = differenceInMonths / 12;
  let str = "本站已经苟活了 ";
  if (differenceInYears >= 1) {
    str += Math.floor(differenceInYears) + " 年 ";
  }
  if (differenceInMonths % 12 >= 1) {
    str += Math.floor(differenceInMonths % 12) + " 月 ";
  }
  if (differenceInDays % 30 >= 1) {
    str += Math.floor(differenceInDays % 30) + " 天";
  }
  return str;
};

export function Footer() {
  const { settings } = useSettings('basic');
  console.log('🧞‍♀️:\n', settings);

  // settings.linkedinUrl = ""
  const socialLinks = [
    {
      key: 'githubUrl',
      icon: 'ri-github-fill',
      label: 'GitHub'
    },
    {
      key: 'twitterUrl',
      icon: 'ri-twitter-x-fill',
      label: 'Twitter'
    },
    {
      key: 'discordUrl',
      icon: 'ri-discord-fill',
      label: 'Discord'
    },
    {
      key: 'youtubeUrl',
      icon: 'ri-youtube-fill',
      label: 'YouTube'
    },
    {
      key: 'weixinUrl',
      icon: 'ri-wechat-fill',
      label: 'WeChat'
    },
    {
      key: 'weiboUrl',
      icon: 'ri-weibo-fill',
      label: 'Weibo'
    },
    {
      key: 'bilibiliUrl',
      icon: 'ri-bilibili-fill',
      label: 'Bilibili'
    },
    {
      key: 'zhihuUrl',
      icon: 'ri-zhihu-fill',
      label: 'Zhihu'
    },
    // {
    //   key: 'linkedinUrl',
    //   icon: 'ri-linkedin-fill',
    //   label: 'LinkedIn'
    // },
    {
      key: 'contactEmail',
      icon: 'ri-mail-fill',
      label: 'Contact Email'
    },
  ];

  return (
    <footer className="w-full border-t bg-background">
      <div className="mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4">
          {/* 左侧版权信息 */}
          {(
            <div className="text-sm text-muted-foreground order-first md:order-none flex items-center gap-1">
              <img src="/logo.svg" alt="Pintree Logo" className="h-4 w-4" />
              Powered by{' '}
              <Link
                href="https://pintree.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/90 transition-colors"
              >
                Pintree
              </Link>
            </div>
          )}

          {/* 中间 Powered by 信息 */}

          <div className="text-sm text-muted-foreground text-center md:text-left" style={{ margin: 0 }}>
            <p>{siteDateStatistics(new Date('2025/1/1'))}</p>
            <span>{settings.copyrightText}</span>
          </div>

          {/* 右侧社交媒体链接 */}
          <div className="flex items-center space-x-4">
            {socialLinks.map(({ key, icon, label }) =>
              (key === 'contactEmail' ? settings[key] : settings[key]) && (
                <Link
                  key={key}
                  href={key === 'contactEmail' ? `mailto:${settings[key]}` : settings[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={label}
                >
                  <i className={`${icon} h-6 w-6`} />
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
} 