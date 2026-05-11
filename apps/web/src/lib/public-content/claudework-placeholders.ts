import type { ActivityDetail, ActivityMedia } from '@/types/activity'
import type { GalleryAlbumItem, GalleryPhotoItem } from '@/types/media-library'

export const CLAUDEWORK_PLACEHOLDER_SOURCE = 'claudework-placeholder-v1'

type ActivityFixture = Omit<
  ActivityDetail,
  'href' | 'dateLabel' | 'dateSort' | 'locationLabel' | 'mediaCount' | 'videoCount' | 'linkCount'
>

const placeholderAspects = ['3 / 4', '4 / 5', '1 / 1', '4 / 3', '3 / 2', '16 / 10']

function makeMedia(prefix: string, count: number, captions: string[]): ActivityMedia[] {
  return Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, '0')

    return {
      id: `${prefix}-${number}`,
      src: `/media/placeholders/${prefix}-${number}.jpg`,
      alt: captions[index % captions.length] ?? `${prefix} ${number}`,
      caption: captions[index % captions.length],
      width: 1600,
      height: 1100
    }
  })
}

function makeGalleryPhotos(
  albumKey: string,
  title: string,
  activitySlug: string,
  activityTitle: string,
  media: ActivityMedia[],
  tones: number[]
): GalleryPhotoItem[] {
  return media.map((image, index) => ({
    id: image.id,
    number: String(index + 1).padStart(2, '0'),
    caption: image.caption ?? title,
    activitySlug,
    activityTitle,
    image,
    aspectRatio: placeholderAspects[index % placeholderAspects.length],
    tone: tones[index % tones.length]
  }))
}

const gobiCaptions = [
  '起跑前 / 沙鸣山 / 06:11',
  '第一日补给点 / 14:08',
  '夜宿营地 / 21:02',
  '第二日逆风 / 11:34',
  '队伍剪影 / 17:21',
  '啦啦队 / 13:58',
  '第三日老路 / 16:10',
  '终点前最后 1km / 18:30',
  '终点合影 / 18:42'
]

const banquetCaptions = [
  '草坪 / 西郊 / 17:30',
  '弦乐四重奏 / 18:00',
  '签到台',
  '晚宴长桌 / 19:11',
  '致辞 / 校友会会长',
  '夜灯 / 长桌远景',
  '敬酒 / 同学合影',
  '签名墙',
  '焰火 / 22:08',
  '8A-194 班合影',
  '返场曲 / 钢琴独奏',
  '散场 / 23:30'
]

const visitCaptions = [
  '字节跳动 / 朝阳门',
  '中金公司 / 北京',
  '美的工业 4.0 / 顺德',
  '招商局 / 蛇口',
  '腾讯滨海 / 深圳',
  '联想总部 / 北京',
  '宁德时代 / 福建',
  '比亚迪 / 西安',
  '华为松山湖',
  '宝马慕尼黑（线上）'
]

const readingCaptions = [
  '朗润园 № 07 / 张维迎',
  '复旦经院 № 01 / 兰小欢',
  '港大主楼 № 04',
  '深圳前海 № 05',
  '苏州大学 № 06',
  '线上 № 02 / 何帆',
  '岭南大学 № 03',
  '黄浦江畔 № 08',
  '西郊 № 09'
]

const gobiPhotos = makeMedia('gobi21', 9, gobiCaptions)
const ultraGobiPhotos: ActivityMedia[] = [
  {
    id: 'ultra-gobi-run-guilin-01',
    src: '/media/gobi21-support/gobi-run-guilin-01.jpg',
    alt: '港大戈21 训练队伍在桂林拉练途中集体奔跑',
    caption: '桂林站拉练现场，队伍在山水之间磨合节奏与默契。',
    width: 6000,
    height: 4000
  },
  {
    id: 'ultra-gobi-class-pku-01',
    src: '/media/gobi21-support/gobi-class-pku-01.jpg',
    alt: '8A-194 班同学在北大光华管理学院门前集结合影',
    caption: '班级在北大光华门前集结，留下这次专题的班级合影。',
    width: 3000,
    height: 2016
  },
  {
    id: 'ultra-gobi-chairman-stage',
    src: '/media/gobi21-support/gobi-chairman-stage.jpg',
    alt: '班级代表在台上发言，为港大戈21 动员',
    caption: '从台上的动员发言，到台下的组织与支持，班级力量落在具体行动里。',
    width: 6000,
    height: 4012
  },
  {
    id: 'ultra-gobi-committee-fuzhou-01',
    src: '/media/gobi21-support/gobi-committee-fuzhou-01.jpg',
    alt: '港大戈21 拉练活动福州站合影',
    caption: '福州站拉练与支持小组合影，记录行动推进中的一站。',
    width: 1920,
    height: 1280
  },
  {
    id: 'ultra-gobi-launch-fuzhou-01',
    src: '/media/gobi21-support/gobi-launch-fuzhou-01.jpg',
    alt: '港大戈21 福州站活动启动现场',
    caption: '福州站活动启动，班级支持行动进入更具体的节奏。',
    width: 1920,
    height: 1280
  },
  {
    id: 'ultra-gobi-class-boya-lake',
    src: '/media/gobi21-support/gobi-class-boya-lake.jpg',
    alt: '8A-194 班在北大博雅湖畔合影',
    caption: '博雅湖畔的班级合影，把戈壁挑战赛前后的班级记忆连接起来。',
    width: 6141,
    height: 4096
  },
  {
    id: 'ultra-gobi-chairman-portrait',
    src: '/media/gobi21-support/gobi-chairman-portrait.jpg',
    alt: '港大戈21 支持行动人物肖像',
    caption: '支持行动中的人物肖像，记录组织者与参与者的现场状态。',
    width: 1280,
    height: 1920
  },
  {
    id: 'ultra-gobi-donation-880k-cny',
    src: '/media/gobi21-support/gobi-donation-880k-cny.png',
    alt: '港大戈21 支持行动捐赠记录海报',
    caption: '阶段性捐赠记录，把班级公益支持转化为可追踪的档案。',
    width: 1290,
    height: 2786
  },
  {
    id: 'ultra-gobi-0ec88eff2799e86a0e9162173d846fcd',
    src: '/media/gobi21-support/0ec88eff2799e86a0e9162173d846fcd.jpg',
    alt: '港大戈21 支持行动新增现场影像',
    caption: '戈壁挑战赛支持行动现场影像 09。',
    width: 6000,
    height: 4000
  },
  {
    id: 'ultra-gobi-2aba8747e4cc50056247176e735744cd',
    src: '/media/gobi21-support/2aba8747e4cc50056247176e735744cd.jpg',
    alt: '港大戈21 支持行动新增现场影像',
    caption: '戈壁挑战赛支持行动现场影像 10。',
    width: 6000,
    height: 4000
  },
  {
    id: 'ultra-gobi-12899168b480f5fc80485cde40cf6854',
    src: '/media/gobi21-support/12899168b480f5fc80485cde40cf6854.jpg',
    alt: '港大戈21 支持行动新增现场影像',
    caption: '戈壁挑战赛支持行动现场影像 11。',
    width: 1920,
    height: 1280
  },
  {
    id: 'ultra-gobi-866ecc9dcea9d19ac3ecd388442b3f78',
    src: '/media/gobi21-support/866ecc9dcea9d19ac3ecd388442b3f78.jpg',
    alt: '港大戈21 支持行动新增现场影像',
    caption: '戈壁挑战赛支持行动现场影像 12。',
    width: 1080,
    height: 722
  },
  {
    id: 'ultra-gobi-a19478d6300ea3d0ccaa76748af4fcde',
    src: '/media/gobi21-support/a19478d6300ea3d0ccaa76748af4fcde.jpg',
    alt: '港大戈21 支持行动新增现场影像',
    caption: '戈壁挑战赛支持行动现场影像 13。',
    width: 1440,
    height: 960
  },
  {
    id: 'ultra-gobi-aca9c395edaef1f77f582f6bec459f0d',
    src: '/media/gobi21-support/aca9c395edaef1f77f582f6bec459f0d.jpg',
    alt: '港大戈21 支持行动新增现场影像',
    caption: '戈壁挑战赛支持行动现场影像 14。',
    width: 1280,
    height: 1916
  },
  {
    id: 'ultra-gobi-be74cc95943e90c0fe27cf36a3acc765',
    src: '/media/gobi21-support/be74cc95943e90c0fe27cf36a3acc765.jpg',
    alt: '港大戈21 支持行动新增现场影像',
    caption: '戈壁挑战赛支持行动现场影像 15。',
    width: 1268,
    height: 845
  },
  {
    id: 'ultra-gobi-donation',
    src: '/media/gobi21-support/donation.jpg',
    alt: '港大戈21 支持行动新增捐赠记录',
    caption: '戈壁挑战赛支持行动捐赠记录补充影像。',
    width: 940,
    height: 1617
  }
]
const banquetPhotos = makeMedia('banquet', 26, banquetCaptions)
const visitPhotos = makeMedia('visit', 19, visitCaptions)
const readingPhotos = makeMedia('reading', 28, readingCaptions)

export const claudeworkGalleryAlbums: GalleryAlbumItem[] = [
  {
    id: 'album-gobi21',
    albumKey: 'gobi21',
    activitySlug: 'hku-charity',
    title: '戈壁挑战赛 · Ultra Gobi',
    compactTitle: '戈壁挑战赛',
    year: 2026,
    sortDate: '2026-05-03',
    dateLabel: '2026.05.03',
    locationLabel: '深圳 · 福州 · 桂林 · 北京',
    themeLabel: '戈壁',
    summary: '港大戈21 支持行动、拉练、动员与班级公益记录的影像卷。',
    imageCount: ultraGobiPhotos.length,
    photos: makeGalleryPhotos('gobi21', '戈壁挑战赛', 'hku-charity', 'HKU EMBA｜8A班为港大戈21赛加油，累计捐赠133万', ultraGobiPhotos, [
      2,
      1,
      3,
      2,
      1,
      4
    ])
  },
  {
    id: 'album-banquet',
    albumKey: 'banquet',
    activitySlug: 'chunxu',
    title: '班级晚宴 · Banquets',
    compactTitle: '班级晚宴',
    year: 2026,
    sortDate: '2026-04-18',
    dateLabel: '2026.04.18',
    locationLabel: '上海 · 西郊宾馆',
    themeLabel: '晚宴',
    summary: '共赴春序、迎新晚宴和班级长桌的公开影像卷。',
    imageCount: 26,
    photos: makeGalleryPhotos('banquet', '班级晚宴', 'chunxu', '共赴春序', banquetPhotos, [
      3,
      4,
      3,
      1,
      2
    ])
  },
  {
    id: 'album-visit',
    albumKey: 'visit',
    activitySlug: 'hku-charity',
    title: '企业参访 · Visits',
    compactTitle: '企业参访',
    year: 2026,
    sortDate: '2026-03-22',
    dateLabel: '2026.03.22',
    locationLabel: '香港 · 港大',
    themeLabel: '企业参访',
    summary: '企业现场、交流桌和移动课堂的公开影像卷。',
    imageCount: 19,
    photos: makeGalleryPhotos('visit', '企业参访', 'hku-charity', 'HKU EMBA｜8A班为港大戈21赛加油，累计捐赠133万', visitPhotos, [
      1,
      2,
      4,
      1,
      3
    ])
  },
  {
    id: 'album-reading',
    albumKey: 'reading',
    activitySlug: 'hku-charity',
    title: '读书会 · Reading',
    compactTitle: '读书会',
    year: 2026,
    sortDate: '2026-02-12',
    dateLabel: '2026.02.12',
    locationLabel: '北京 · 朗润园',
    themeLabel: '读书会',
    summary: '读书会和嘉宾分享的公开影像卷。',
    imageCount: 28,
    photos: makeGalleryPhotos('reading', '读书会', 'hku-charity', 'HKU EMBA｜8A班为港大戈21赛加油，累计捐赠133万', readingPhotos, [
      3,
      1,
      3,
      2
    ])
  }
]

export const claudeworkActivityFixtures: ActivityFixture[] = [
  {
    slug: 'gobi21',
    title: '跨越风沙的 121 公里 / 8A 班出征 2026 戈友会，载誉而归',
    subtitle: '8A 班连续两届出征港大戈友会公益挑战赛。本卷收录从筹备、集训、出征到完赛的 9 张影像与 2 段视频，以及一份持续更新的班级支持记录。',
    summary:
      '8A-194 班连续第二年踏上戈壁，以挑战和公益的双重身份支持港大戈友会；这一卷记录主队、啦啦队、捐赠人和影像编辑部共同完成的一程。',
    year: 2026,
    date: { start: '2026-05-03', end: '2026-05-06' },
    location: { city: '敦煌', venue: '莫贺延碛' },
    theme: 'charity',
    themeLabel: '戈壁',
    tags: ['戈壁', '公益', '挑战赛'],
    archiveNumber: '036',
    durationLabel: '4 日 3 夜',
    dossierLabel: 'Activity dossier',
    byline: [
      { id: 'date', label: 'Date · 时间', value: '2026.05.03 — 2026.05.06' },
      { id: 'location', label: 'Location · 地点', value: '甘肃 · 敦煌 · 莫贺延碛' },
      { id: 'participants', label: 'Participants · 参与', value: '8A 主队 12 人 · 啦啦队 38 人' },
      { id: 'editors', label: 'Editors · 编辑部', value: '影像组 · 文字组 · 后勤组' }
    ],
    coverImage: undefined,
    heroImages: [],
    gallery: gobiPhotos,
    videos: [
      {
        id: 'gobi-doc',
        title: '沙鸣山的四日',
        provider: 'wechatChannels',
        providerLabel: '视频号',
        href: 'https://channels.weixin.qq.com/hkupku8a194-gobi-doc',
        category: 'documentary',
        categoryLabel: '纪录片',
        duration: '12:04',
        publishedAt: '2026-05-08'
      },
      {
        id: 'gobi-briefing',
        title: '走进字节总部',
        provider: 'wechatChannels',
        providerLabel: '视频号',
        href: 'https://channels.weixin.qq.com/hkupku8a194-gobi-briefing',
        category: 'highlights',
        categoryLabel: '活动花絮',
        duration: '06:31',
        publishedAt: '2026-05-02'
      }
    ],
    links: [
      {
        id: 'gobi21-wechat',
        label: '戈21 班级支持行动纪要',
        href: 'https://mp.weixin.qq.com/s/hkupku8a194-gobi21',
        type: 'wechatArticle',
        source: '8A-194 班公开记录',
        publishedAt: '2026-05-08'
      }
    ],
    guests: [],
    speakers: [],
    organizers: ['8A-194 班委会', '戈21 支持小组'],
    bodySections: [],
    richBody: [
      {
        id: 'opening',
        type: 'paragraph',
        text: '这是 8A 班连续第二年踏上戈壁。一年前，8A 主队第一次以“挑战 + 公益”的双重身份站上港大戈友会的赛道；一年后，同一群人带着更稳的步频回到莫贺延碛——这一次，他们不再是新兵。'
      },
      {
        id: 'fundraising',
        type: 'paragraph',
        text: '从年初的集训开始，主队进行了三轮耐力测试；与此同时，班级公益小组联络港大戈友基金，把“为每一公里筹一分钱”的想法落地。最终，8A 班以个人名义参与捐赠，累计 ¥1,330,000，全部用于港大戈友会设立的边疆教育与女性领导力两项基金。'
      },
      { id: 'heading-pace', type: 'heading', text: '四日三夜，步频与心跳', level: 2 },
      {
        id: 'pace',
        type: 'paragraph',
        text: '121 公里，沙、碛、戈。第一天 35 公里，沙鸣山的逆风把整支队伍吹得节奏全乱；第二天 32 公里，正午地表 42 ℃，主队在补给点交换了一次队形；第三天 28 公里，是莫贺延碛老路；第四天 26 公里，进入终点，整支主队全部完赛。'
      },
      {
        id: 'quote',
        type: 'quote',
        text: '走戈壁的意义，不在 121 公里，而在第 97 公里时，那个递给你电解质的人。',
        attribution: '8A-194 班影像编辑部'
      },
      {
        id: 'figure-camp',
        type: 'figure',
        number: 'FIG · 01',
        tone: 2,
        caption: '戈21 终点合影 / 莫贺延碛 / 2026.05.06 18:42'
      },
      {
        id: 'list',
        type: 'orderedList',
        items: ['主队同学的全程影像（含逐日纪要、起终点合影、终点感言）', '啦啦队的随队照片与对内分享视频', '班级公益捐赠的发起、传播与交付记录', '编辑部整理的路线图、补给点、装备清单与复盘笔记']
      },
      { id: 'heading-map', type: 'heading', text: '给下一届的地图', level: 2 },
      {
        id: 'map',
        type: 'paragraph',
        text: '这卷档案最终的去向，不是停在这一页。我们把它打包寄给下一届——9A、9B、以及之后所有想走这条路的同学。每一张照片背后，都附一句对话：训练、补给、夜宿、伤病、心绪。可以被翻阅，也可以被反驳。'
      },
      {
        id: 'closing',
        type: 'paragraph',
        text: '这是 8A 班对戈壁挑战赛的第二份答卷，也是这卷档案被建起来的原因之一。'
      }
    ],
    metrics: [
      { id: 'distance', value: '121', suffix: 'km', label: 'Total distance', description: '4 日 · 主队 12 人完成全程' },
      { id: 'donation', value: '¥1.33', suffix: 'M', label: 'Donations raised', description: '班级支持港大戈友会' },
      { id: 'media', value: '9', suffix: '/2', label: 'Photos / Videos', description: '影像卷与视频条目' },
      { id: 'route', value: '2', suffix: '/2', label: 'Years on the route', description: '连续两届参与戈友会相关行动' }
    ],
    photoStrip: {
      title: '影像 4 / 9',
      totalLabel: '查看本卷全部 9 张',
      href: '/gallery?album=gobi21',
      items: [
        { id: 'strip-12', number: '12', caption: '沙鸣山日出 / 06:11', tone: 2 },
        { id: 'strip-21', number: '21', caption: '补给站 / 14:08', tone: 1 },
        { id: 'strip-33', number: '33', caption: '夜宿营地 / 21:02', tone: 3 },
        { id: 'strip-47', number: '47', caption: '终点合影 / 莫贺延碛 / 18:42', tone: 4 }
      ]
    },
    timeline: [
      { id: 'd1', dateLabel: 'Day 01 · 05.03', value: '35 km', description: '沙鸣山起点到第一晚营地。下午逆风，晚间抵达营地。' },
      { id: 'd2', dateLabel: 'Day 02 · 05.04', value: '32 km', description: '正午高温，主队交换队形，补给两次。' },
      { id: 'd3', dateLabel: 'Day 03 · 05.05', value: '28 km', description: '莫贺延碛老路，啦啦队接力扶持。' },
      { id: 'd4', dateLabel: 'Day 04 · 05.06', value: '26 km', description: '终点合影，班级旗在终点拍下本卷封面。' }
    ],
    relatedArchives: [
      { id: 'rel-chunxu', number: '№ 035', title: '共赴春序 / 194 班春日草坪音乐会晚宴', href: '/activities/chunxu', meta: '2026·04·18 · 晚宴', tone: 3 },
      { id: 'rel-charity', number: '№ 034', title: '8A班为港大戈21赛加油，累计捐赠133万', href: '/activities/hku-charity', meta: '2026·03·22 · 戈壁', tone: 4 }
    ],
    featured: true,
    updatedAt: '2026-05-08',
    seo: {
      title: '跨越风沙的 121 公里 / 戈21',
      description: '8A-194 班出征 2026 戈友会的活动专题、影像卷与时间线。'
    }
  },
  {
    slug: 'chunxu',
    title: '共赴春序 / 194 班春日草坪音乐会晚宴',
    subtitle: '在西郊草坪重聚，把长桌、音乐和班级合影放进同一卷。',
    summary: '共赴春序记录 8A-194 班春日草坪音乐会晚宴，含长桌、致辞、合影和返场曲等班级公开影像。',
    year: 2026,
    date: { start: '2026-04-18' },
    location: { city: '上海', venue: '西郊宾馆' },
    theme: 'reunion',
    themeLabel: '晚宴',
    tags: ['晚宴', '春序', '音乐会'],
    archiveNumber: '035',
    durationLabel: '1 晚',
    dossierLabel: 'Activity dossier',
    byline: [
      { id: 'date', label: 'Date · 时间', value: '2026.04.18' },
      { id: 'location', label: 'Location · 地点', value: '上海 · 西郊宾馆' },
      { id: 'participants', label: 'Participants · 参与', value: '8A-194 班同学与家属' },
      { id: 'editors', label: 'Editors · 编辑部', value: '班级文字组 · 影像组' }
    ],
    coverImage: undefined,
    heroImages: [],
    gallery: banquetPhotos,
    videos: [
      {
        id: 'chunxu',
        title: '共赴春序 · 草坪音乐会',
        provider: 'wechatChannels',
        providerLabel: '视频号',
        href: 'https://channels.weixin.qq.com/hkupku8a194-chunxu',
        category: 'highlights',
        categoryLabel: '活动花絮',
        duration: '04:18',
        publishedAt: '2026-04-20'
      },
      {
        id: 'welcome',
        title: '读书会 № 07 / 节选',
        provider: 'wechatChannels',
        providerLabel: '视频号',
        href: 'https://channels.weixin.qq.com/hkupku8a194-reading-07',
        category: 'clip',
        categoryLabel: '分享片段',
        duration: '08:55',
        publishedAt: '2026-04-19'
      }
    ],
    links: [],
    guests: [],
    speakers: [],
    organizers: ['8A-194 班委会'],
    bodySections: [],
    richBody: [
      { id: 'opening', type: 'paragraph', text: '春序是一场面向班级内部和朋友的重聚：音乐、长桌、签到台和合影，把一个班级在课堂外的关系重新调亮。' },
      { id: 'heading', type: 'heading', text: '晚宴不是终点，是再次出发的前奏', level: 2 },
      { id: 'copy', type: 'paragraph', text: '这一卷保留的是可被翻阅的公共部分：时间、地点、角色、照片和视频入口，为后续补齐真实素材留下稳定位置。' }
    ],
    metrics: [
      { id: 'photos', value: '26', label: 'Photos', description: '班级晚宴影像' },
      { id: 'videos', value: '2', label: 'Videos', description: '花絮与片段' },
      { id: 'classmates', value: '35', label: 'Classmates', description: '实际班级人数' }
    ],
    photoStrip: {
      title: '影像 4 / 26',
      totalLabel: '查看本卷全部 26 张',
      href: '/gallery?album=banquet',
      items: [
        { id: 'chunxu-strip-1', number: '01', caption: '草坪 / 西郊 / 17:30', tone: 3 },
        { id: 'chunxu-strip-2', number: '04', caption: '晚宴长桌 / 19:11', tone: 4 },
        { id: 'chunxu-strip-3', number: '10', caption: '8A-194 班合影', tone: 1 },
        { id: 'chunxu-strip-4', number: '12', caption: '散场 / 23:30', tone: 3 }
      ]
    },
    timeline: [
      { id: 'arrive', dateLabel: '17:30', value: 'Arrival', description: '签到、草坪合影和音乐会开场。' },
      { id: 'dinner', dateLabel: '19:11', value: 'Dinner', description: '长桌晚宴、致辞和班级交流。' },
      { id: 'close', dateLabel: '22:08', value: 'Encore', description: '返场曲、合影和散场记录。' }
    ],
    relatedArchives: [
      { id: 'rel-gobi', number: '№ 036', title: '跨越风沙的 121 公里 / 戈21', href: '/activities/gobi21', meta: '2026·05·03 · 戈壁', tone: 2 },
      { id: 'rel-charity', number: '№ 034', title: '8A班为港大戈21赛加油，累计捐赠133万', href: '/activities/hku-charity', meta: '2026·03·22 · 戈壁', tone: 4 }
    ],
    featured: true,
    updatedAt: '2026-04-20',
    seo: {
      title: '共赴春序 / 194 班春日草坪音乐会晚宴',
      description: '8A-194 班春日草坪音乐会晚宴的公开归档。'
    }
  },
  {
    slug: 'hku-charity',
    title: 'HKU EMBA｜8A 班为港大戈21赛加油，累计捐赠133万',
    subtitle: '从深圳、福州、丽江到桂林，8A-194 班一路见证港大戈21战队成长，也以真金白银托举队伍远征戈壁。',
    summary: '8A-194 班支持港大戈21赛的专题归档，收录赛事背景、班级行动、捐赠名单、报名号召和现场影像。',
    year: 2026,
    date: { start: '2026-03-22' },
    location: { city: '多站联动', venue: '深圳 · 福州 · 丽江 · 桂林 · 戈壁' },
    theme: 'charity',
    themeLabel: '戈壁',
    tags: ['戈壁挑战赛', '港大戈21', '公益捐赠', '班级支持'],
    archiveNumber: '034',
    durationLabel: '121 公里',
    dossierLabel: 'Ultra Gobi',
    byline: [
      { id: 'date', label: 'Date · 时间', value: '2026.03.22' },
      { id: 'location', label: 'Location · 地点', value: '深圳 · 福州 · 丽江 · 桂林 · 戈壁' },
      { id: 'participants', label: 'Participants · 参与', value: '8A-194 班 · 港大戈21战队' },
      { id: 'editors', label: 'Editors · 编辑部', value: '班委会 · 戈21支持小组 · 影像组' }
    ],
    coverImage: ultraGobiPhotos[0],
    heroImages: ultraGobiPhotos.slice(0, 3),
    gallery: ultraGobiPhotos,
    videos: [
      {
        id: 'talk-zhang',
        title: '对话 № 11 / 张维教授',
        provider: 'wechatChannels',
        providerLabel: '视频号',
        href: 'https://channels.weixin.qq.com/hkupku8a194-talk-zhang',
        category: 'dialogue',
        categoryLabel: '嘉宾对话',
        duration: '38:21',
        publishedAt: '2026-03-24'
      },
      {
        id: 'talk-he',
        title: '对话 № 10 / 何帆教授',
        provider: 'wechatChannels',
        providerLabel: '视频号',
        href: 'https://channels.weixin.qq.com/hkupku8a194-talk-he',
        category: 'dialogue',
        categoryLabel: '嘉宾对话',
        duration: '34:12',
        publishedAt: '2026-03-25'
      }
    ],
    links: [],
    guests: [
      { id: 'g01', name: '张 维 教授', role: '到访嘉宾', affiliation: '香港 · 港大' },
      { id: 'g02', name: '何 帆 教授', role: '教授', affiliation: '上海 · 复旦' },
      { id: 'g03', name: '兰 小欢 教授', role: '教授', affiliation: '上海 · 复旦' }
    ],
    speakers: [
      { id: 'g01', name: '张 维 教授', role: '到访嘉宾', affiliation: '香港 · 港大' },
      { id: 'g02', name: '何 帆 教授', role: '教授', affiliation: '上海 · 复旦' }
    ],
    organizers: ['8A-194 班委会', '戈21支持小组'],
    bodySections: [],
    richBody: [
      { id: 'intro', type: 'paragraph', text: '“玄奘之路戈壁挑战赛”（简称“戈赛”）创立于 2006 年，是以全球知名商学院为参赛主体的分段多日戈壁耐力赛事。戈赛全程 121 公里，不仅考验个体的体能与意志，也强调团队协同、领导力与责任担当。' },
      { id: 'influence', type: 'paragraph', text: '二十年来，戈赛已汇聚来自全球近百所顶级商学院及众多企业家群体参与，累计影响数十万创业者与企业家，成为华语商学院最具影响力的耐力挑战赛事之一，也持续影响着全球企业家群体的生活方式与精神追求。' },
      { id: 'quote-people-daily', type: 'quote', text: '中国规模最大、参与队伍最多的户外顶级赛事及民族体育 IP。', attribution: '《人民日报》' },
      { id: 'road-heading', type: 'heading', text: '戈21，是一条值得携手并进的路', level: 2 },
      { id: 'road-meaning', type: 'paragraph', text: '对于 8A-194 班来说，戈21从来不只是一个赛事名字，更是一条值得携手并进的路。' },
      { id: 'stations', type: 'paragraph', text: '从深圳站启程开篇，到福州站戈21组委会正式成立；从丽江站在高原极限中锤炼意志，到桂林站于起伏赛道与风雨烈日中淬炼韧性。一路奔赴，一路淬火，都是为了最终的戈壁远征积蓄力量。' },
      { id: 'not-alone', type: 'quote', text: '戈赛从来不是一个人的奔跑，而是一群人的一起出发、一起到达。' },
      { id: 'support-heading', type: 'heading', text: '真金白银，全力支持戈21', level: 2 },
      { id: 'support-intro', type: 'paragraph', text: '一路见证港大戈21战队的成长之后，我们也更深刻地理解了戈赛的意义。正因为如此，8A-194 班除了出人出力，也选择了最直接的支持方式：以真金白银，全力支持港大戈21。' },
      {
        id: 'donation-list',
        type: 'orderedList',
        items: [
          '戈21主席、HKU-PKU EMBA 8A-194 班班长徐海军赞助人民币 88 万元。',
          '副班长肖鹏程赞助人民币 10 万元。',
          '荣誉班长郑少纯赞助人民币 10 万元。',
          '邓俊文同学赞助港币 20 万元。',
          '班委何松蔚 Song 赞助人民币 5 万元。'
        ]
      },
      { id: 'donation-total', type: 'quote', text: '截至目前，8A-194 班已累计为港大戈21赛捐助现金合计 133 万元。' },
      { id: 'attitude', type: 'paragraph', text: '这不仅是一组数字，更是班级共同写下的态度。我们不只为港大戈21加油，更愿意在队伍需要的时候站出去、扛起来；我们不只关心谁在赛道上冲刺，也愿意成为赛道背后那股坚定的力量。' },
      { id: 'together-heading', type: 'heading', text: '用行动证明：我们在', level: 2 },
      { id: 'cohesion', type: 'paragraph', text: '真正的班级凝聚力，不只是课堂里的同窗情谊，不只是活动中的欢声笑语，更是在学院需要、团队需要、荣誉需要的时候，能够用行动证明“我们在”。' },
      { id: 'thanks', type: 'paragraph', text: '感谢每一位以实际行动支持港大戈21的同学。正是这份热爱、担当与托举，让“明德格物，全力以赴”不只是一句口号，更成为 8A-194 班共同书写的班级注脚。' },
      { id: 'join-heading', type: 'heading', text: '报名通道已开启，向戈壁出发', level: 2 },
      { id: 'join', type: 'paragraph', text: '目前，8A-194 班报名人数已经过半。期待更多同学积极参与，加入港大戈21队伍，和我们一起，向戈壁出发。' },
      { id: 'slogan', type: 'quote', text: '明德格物，全力以赴。港大港大，越搞越大。戈21路上，港大必达；8A-194 班，与港大同行。' }
    ],
    metrics: [
      { id: 'donation', value: '133', suffix: '万', label: 'Donations', description: '已累计现金捐助' },
      { id: 'distance', value: '121', suffix: '公里', label: 'Ultra Gobi', description: '戈赛全程距离' },
      { id: 'history', value: '2006', label: 'Since', description: '玄奘之路戈壁挑战赛创立年份' },
      { id: 'registration', value: '过半', label: 'Registration', description: '8A-194 班报名进度' }
    ],
    photoStrip: {
      title: `影像 4 / ${ultraGobiPhotos.length}`,
      totalLabel: `查看相关影像 ${ultraGobiPhotos.length} 张`,
      href: '/gallery?album=gobi21',
      items: [
        { id: 'hku-strip-1', image: ultraGobiPhotos[0], number: '01', caption: '桂林站拉练现场', tone: 2 },
        { id: 'hku-strip-2', image: ultraGobiPhotos[1], number: '02', caption: '北大光华门前合影', tone: 1 },
        { id: 'hku-strip-3', image: ultraGobiPhotos[2], number: '03', caption: '动员发言现场', tone: 3 },
        { id: 'hku-strip-4', image: ultraGobiPhotos[7], number: '08', caption: '阶段性捐赠记录', tone: 4 }
      ]
    },
    timeline: [
      { id: 'shenzhen', dateLabel: '深圳站', value: 'Start', description: '港大戈21备战启程，班级支持行动同步开篇。' },
      { id: 'fuzhou', dateLabel: '福州站', value: 'Committee', description: '戈21组委会正式成立，支持行动进入组织化推进。' },
      { id: 'lijiang', dateLabel: '丽江站', value: 'Altitude', description: '在高原极限中锤炼意志，为远征积累韧性。' },
      { id: 'guilin', dateLabel: '桂林站', value: 'Training', description: '在起伏赛道与风雨烈日中继续拉练，队伍默契持续成形。' },
      { id: 'donation', dateLabel: '截至目前', value: '¥1.33M', description: '8A-194 班累计为港大戈21赛捐助现金合计 133 万元。' }
    ],
    relatedArchives: [
      { id: 'rel-gobi', number: '№ 036', title: '跨越风沙的 121 公里 / 戈21', href: '/activities/gobi21', meta: '2026·05·03 · 戈壁', tone: 2 },
      { id: 'rel-chunxu', number: '№ 035', title: '共赴春序 / 194 班春日草坪音乐会晚宴', href: '/activities/chunxu', meta: '2026·04·18 · 晚宴', tone: 3 }
    ],
    featured: true,
    updatedAt: '2026-03-25',
    seo: {
      title: 'HKU EMBA｜8A班为港大戈21赛加油，累计捐赠133万',
      description: '8A-194 班支持港大戈21赛的专题归档，记录赛事背景、班级行动、捐赠名单和报名号召。'
    }
  }
]
