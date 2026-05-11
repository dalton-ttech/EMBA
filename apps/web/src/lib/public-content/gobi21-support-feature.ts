import type { ActivityDetail } from '@/types/activity'

type ActivityFixture = Omit<
  ActivityDetail,
  'href' | 'dateLabel' | 'dateSort' | 'locationLabel' | 'mediaCount' | 'videoCount' | 'linkCount'
>

const chairmanPortrait = {
  id: 'gobi-chairman-portrait',
  src: '/media/gobi21-support/gobi-chairman-portrait.jpg',
  alt: '徐海军在港大戈21训练活动中的肖像',
  width: 1280,
  height: 1920,
  caption: '班长徐海军在训练现场，为港大戈21持续鼓劲。'
} as const

const keyPeople = {
  xu: {
    id: 'xu-hai-jun',
    name: '徐海军',
    role: '港大戈21主席 / 8A-194班班长',
    affiliation: '启高国际董事长',
    bio: '牵头班级支持行动，个人赞助人民币88万元。',
    avatar: chairmanPortrait
  },
  xiao: {
    id: 'xiao-peng-cheng',
    name: '肖鹏程',
    role: '班级副班长',
    affiliation: 'HKU-PKU EMBA 8A-194班',
    bio: '支持港大戈21，赞助人民币10万元。'
  },
  zheng: {
    id: 'zheng-shao-chun',
    name: '郑少纯',
    role: '荣誉班长',
    affiliation: 'HKU-PKU EMBA 8A-194班',
    bio: '支持港大戈21，赞助人民币10万元。'
  },
  deng: {
    id: 'deng-jun-wen',
    name: '邓俊文',
    role: '班级同学',
    affiliation: 'HKU-PKU EMBA 8A-194班',
    bio: '支持港大戈21，赞助港币20万元。'
  },
  he: {
    id: 'he-song-wei-song',
    name: '何松蔚 Song',
    role: '班委',
    affiliation: 'HKU-PKU EMBA 8A-194班',
    bio: '支持港大戈21，赞助人民币5万元。'
  }
} as const

export const gobi21SupportFeature: ActivityFixture = {
  slug: '2026-gobi21-class-support',
  title: 'HKU EMBA | 8A班为港大戈21赛加油，累计捐赠133万',
  subtitle: '从深圳启程，到福州、丽江、桂林与北京，8A-194班用行动、陪跑与资金托举港大戈21。',
  summary:
    '围绕港大戈21的备赛与拉练，8A-194班把一次次训练集结、班级动员和真金白银的支持，汇成了一篇带着现场温度的专题纪实。截至当前，班级已累计捐赠133万元，为队伍出征持续托举。',
  year: 2026,
  date: {
    start: '2026-04-25'
  },
  location: {
    city: '多站联动',
    venue: '深圳 · 福州 · 丽江 · 桂林 · 北京'
  },
  theme: 'other',
  themeLabel: '专题纪实',
  coverImage: {
    id: 'gobi-run-guilin-cover',
    src: '/media/gobi21-support/gobi-run-guilin-01.jpg',
    alt: '港大戈21训练队在桂林拉练途中集体奔跑',
    width: 6000,
    height: 4000,
    caption: '桂林站拉练现场，队伍在山水之间磨砺节奏与默契。'
  },
  heroImages: [
    {
      id: 'gobi-run-guilin-hero',
      src: '/media/gobi21-support/gobi-run-guilin-01.jpg',
      alt: '港大戈21训练队在桂林站并肩奔跑',
      width: 6000,
      height: 4000,
      caption: '从训练到出征，班级和队伍的关系在一公里一公里的路上被写实。'
    },
    {
      id: 'gobi-class-pku-hero',
      src: '/media/gobi21-support/gobi-class-pku-01.jpg',
      alt: '8A-194班同学在北大光华管理学院门前集结合影',
      width: 3000,
      height: 2016,
      caption: '班级在北大光华门前集结，留下这次专题最像“共同体”的一张照片。'
    },
    {
      id: 'gobi-chairman-stage-hero',
      src: '/media/gobi21-support/gobi-chairman-stage.jpg',
      alt: '徐海军在台上发言，为港大戈21动员',
      width: 6000,
      height: 4012,
      caption: '从台上的动员发言，到台下的组织和支持，班级的力量落在具体行动里。'
    }
  ],
  gallery: [
    {
      id: 'gobi-committee-fuzhou',
      src: '/media/gobi21-support/gobi-committee-fuzhou-01.jpg',
      alt: '港大经管学院戈21拉练活动福州站全体合影',
      width: 1920,
      height: 1280,
      caption: '福州站，港大经管学院戈21拉练活动留下第一次完整的组织合影。'
    },
    {
      id: 'gobi-launch-fuzhou',
      src: '/media/gobi21-support/gobi-launch-fuzhou-01.jpg',
      alt: '福州站活动现场大屏与班级成员合影',
      width: 1920,
      height: 1280,
      caption: '福州站的舞台画面，把班级支持和队伍出征连接到了一起。'
    },
    {
      id: 'gobi-class-boya-lake',
      src: '/media/gobi21-support/gobi-class-boya-lake.jpg',
      alt: '8A-194班同学在湖边与塔影前合影',
      width: 6141,
      height: 4096,
      caption: '一张轻松的集体照，让“我们在一起”这件事更具体。'
    },
    {
      id: 'gobi-chairman-stage',
      src: '/media/gobi21-support/gobi-chairman-stage.jpg',
      alt: '徐海军在台上发言介绍港大戈21支持行动',
      width: 6000,
      height: 4012,
      caption: '徐海军在现场发言，把班级托举戈21的态度讲得很直接。'
    },
    chairmanPortrait,
    {
      id: 'gobi-donation-880k',
      src: '/media/gobi21-support/gobi-donation-880k-cny.png',
      alt: '徐海军戈赛宣言与赞助88万元海报',
      width: 1290,
      height: 2786,
      caption: '“戈壁砺心，港大同行”，这张海报把88万元支持定格成了公开注脚。'
    }
  ],
  videos: [],
  links: [
    {
      id: 'hku-pku-8a194-site',
      label: '8A-194班公开主页',
      href: 'http://hkupku8a194.com',
      type: 'website',
      source: '班级公众号'
    }
  ],
  tags: ['戈21', '班级支持', '多站拉练', '港大EMBA', '8A-194班'],
  guests: [keyPeople.xu, keyPeople.xiao, keyPeople.zheng, keyPeople.deng, keyPeople.he],
  speakers: [keyPeople.xu, keyPeople.xiao, keyPeople.zheng, keyPeople.deng, keyPeople.he],
  organizers: ['HKU-PKU EMBA 8A-194班班委', '港大戈21组委会'],
  bodySections: [
    {
      id: 'background',
      heading: '为什么大家会记住这段旅程',
      paragraphs: [
        '“玄奘之路戈壁挑战赛”是一项以全球知名商学院为参赛主体的分段多日耐力赛事。它考验的不只是体能，更是团队协同、领导力和责任担当。',
        '对8A-194班来说，戈21不是一条短线活动，而是一段值得全班一起托举、一起记住的共同旅程。训练、捐赠、动员和合影连在一起，才真正看得见这个班级怎样把支持变成行动。'
      ]
    },
    {
      id: 'route',
      heading: '从多站拉练，到共同出发',
      paragraphs: [
        '素材和文案共同勾勒出了一条清晰的路线：从深圳站启程开篇，到福州站组委会正式成立；从丽江站在高原环境中锤炼意志，到桂林站在风雨烈日里继续拉练，再到北京的集结与合影。',
        '这条路线的意义不在于“走过了哪些城市”，而在于班级在每一站都有人出现、有人组织、有人跟进，最终把分散的节点变成了同一段叙事。'
      ]
    },
    {
      id: 'support',
      heading: '133万元，不只是一组数字',
      paragraphs: [
        '本轮专题里最醒目的数字，是班级累计为港大戈21捐赠133万元。其中，徐海军赞助人民币88万元；肖鹏程赞助人民币10万元；郑少纯赞助人民币10万元；邓俊文赞助港币20万元；何松蔚 Song 赞助人民币5万元。',
        '这些支持既是备赛经费，也是班级在关键时刻的态度表达。它们让“我们不只在旁边加油，而是真的愿意站出来扛一把”这件事，有了公开、明确、可以被记住的证据。'
      ]
    },
    {
      id: 'class-spirit',
      heading: '真正被看见的，是班级凝聚力',
      paragraphs: [
        '真正的班级凝聚力，不只发生在课堂讨论和活动合影里，更发生在学院需要、队伍需要、荣誉需要的时候，大家能不能迅速形成同一个动作。',
        '这篇专题最打动人的地方，恰恰是它把班级的热爱、担当与托举写得非常具体。于是“明德格物，全力以赴”不再只是口号，而成了8A-194班可以反复回看的共同记忆。'
      ]
    }
  ],
  featured: true,
  updatedAt: '2026-04-25',
  seo: {
    title: '8A班为港大戈21赛加油，累计捐赠133万',
    description: '围绕港大戈21备赛与拉练，8A-194班用多站训练、组织动员与累计133万元支持，留下值得反复回看的班级专题。'
  }
}
