# EMBA 8A · 班级档案馆 — 设计交付

## 文件清单

| 设计文件 | 你的 Next.js 对应 |
|---|---|
| `index.html` | `page.tsx` + `HomePortal.tsx` |
| `activities.html` | `activities/page.tsx` + `ActivityArchive.tsx` (列表态) |
| `activity-gobi21.html` | `activities/[slug]/page.tsx` + `ActivityArchive.tsx` (详情态) |
| `gallery.html` | `gallery/page.tsx` + `GalleryArchive.tsx` |
| `videos.html` | `videos/page.tsx` + `VideoLibrary.tsx` |
| `about.html` | `about/page.tsx` + `AboutOverview.tsx` |
| `people.html` | `people/page.tsx` + `PeopleDirectory.tsx` |
| `contact.html` | `contact/page.tsx` + `ContactHub.tsx` |
| `tokens.css` | `tokens.css` (覆盖你的) |
| `globals.css` | `globals.css` (覆盖你的) |
| `shared.js` | 拆为 `Nav.tsx` / `Footer.tsx` 两个 React 组件 |

## 落到代码上的建议（1:1 实现）

1. **设计 token 全部用 CSS 变量**，已收口在 `tokens.css`：颜色用 `oklch()`、字体、间距、缓动、容器宽度——可直接覆盖你现在的 `tokens.css`。
2. **暗色 / 编辑版**通过 `<html data-theme="bold">` 切换，整套 token 自动反转——不要写第二套样式。
3. **Hero 拼贴的占位图位置**用 `.collage .c1…c8` 的绝对定位 + `aspect-ratio` 实现。把 `.ph[data-tone="2"]` 替换成真实 `<Image>` 即可。
4. **活动详情页的中间图、引文、首字下沉**已写在 `body` 的 `figure / blockquote / p:first-child::first-letter`，直接搬到 Payload 的 RichText 渲染器即可。
5. **相册 lightbox / 视频 player / 人物 sheet** 都是同一个模式：fixed inset:0 + backdrop-filter + ESC + 左右键盘——可以抽成一个共用的 `<DialogShell>`。
6. **占位图**是纯 CSS（`.ph` + 噪点 SVG mask）。后续把它替换成 `next/image`，`.ph-num` / `.ph-cap` 改作 alt + 编号即可。
7. **首页底部 Tweaks 面板**只是设计阶段用来对比 Conservative / Bold 两版。上线时可以保留为内部预览开关，或直接移除。

## 设计系统要点

- 字体：Newsreader (en serif) / Noto Serif SC (zh serif) / IBM Plex Sans (en sans) / Noto Sans SC (zh sans) / IBM Plex Mono (label)
- 配色 (Conservative)：暖白 oklch(0.972) + 暖墨 oklch(0.195) + 砖红 oklch(0.480 0.092 38) 重音
- 配色 (Bold)：夜墨 oklch(0.135) + 奶油 oklch(0.945) + 黄铜 oklch(0.700 0.110 45) 重音
- 容器：1320 / 1560，留白用 `clamp(20px, 4vw, 56px)` 做侧边距
- 缓动：`cubic-bezier(0.2, 0.7, 0.2, 1)` ／ 600–900 ms 慢节奏

## 仍可继续的事

- 接入真实图片、人物头像后，把所有 `.ph` 占位整体替换为 `next/image`
- 公众号同步：用 Payload 写一个公众号文章 collection，活动详情页的 RichText 字段就是它
- 在 `activities.html` 加上 URL state（`?y=2025&t=戈壁`）和分页/滚动加载，已为 URL params 写好钩子
- 后续如需「按地点」「按嘉宾」第三第四个筛选轴，已为 chip 系统留好扩展
