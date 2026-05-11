import type { ActivityMedia } from '@/types/activity'
import type { PublicPersonCategory } from '@/types/person'
import { CLAUDEWORK_PLACEHOLDER_SOURCE } from './claudework-placeholders'

interface PublicPersonFixture {
  id: string
  slug: string
  number?: string
  name: string
  englishName?: string
  role?: string
  group?: string
  city?: string
  industry?: string
  quote?: string
  related?: string[]
  tone?: number
  category: PublicPersonCategory
  title?: string
  organization?: string
  bio?: string
  avatar?: ActivityMedia
  status: 'draft' | 'review' | 'published' | 'archived'
  isPublic: boolean
  featured?: boolean
  sortOrder: number
  source?: string
}

function toSlug(value: string) {
  return value.toLowerCase().replaceAll(' ', '-').replaceAll('·', '-')
}

function makePerson(person: Omit<PublicPersonFixture, 'slug' | 'status' | 'isPublic' | 'source'>) {
  return {
    ...person,
    slug: toSlug(person.id),
    status: 'published',
    isPublic: true,
    source: CLAUDEWORK_PLACEHOLDER_SOURCE
  } satisfies PublicPersonFixture
}

const classCouncil = [
  ['p001', '001', '王 某', 'Wang Mou', '北京', '金融 / VC', '读戈走完，把每一卷都摆上书架。', 1, ['№ 036 · 戈21', '№ 035 · 共赴春序']],
  ['p002', '002', '陈 某', 'Chen Mou', '上海', '媒体 / 出版', '班级故事的第一稿，多半在我这。', 3, ['№ 035 · 共赴春序']],
  ['p003', '003', '林 某', 'Lin Mou', '深圳', '互联网', '做企业的人，要去彼此的现场。', 2, ['企业参访 · Visits']],
  ['p004', '004', '张 某', 'Zhang Mou', '杭州', '消费品', '摄影机不撒谎，背包带里也不撒谎。', 4, ['№ 036 · 戈21']],
  ['p005', '005', '周 某', 'Zhou Mou', '北京', '投资', '剪辑是一种重新走一遍的方式。', 3, ['V·01 · 沙鸣山的四日']],
  ['p006', '006', '李 某', 'Li Mou', '上海', '品牌设计', '档案是设计的考古题。', 1, ['设计 / 视觉系统']],
  ['p007', '007', '赵 某', 'Zhao Mou', '深圳', '互联网 / 工程', '代码也是一种归档。', 2, ['技术 / 站点维护']]
] as const

const gobiSquad = [
  ['p101', '101', '刘 某', 'Liu Mou', '北京', '医疗', '起跑前三天，老师说今年不一定走完全程。', 2],
  ['p102', '102', '许 某', 'Xu Mou', '上海', '制造', '队形不是体能，是心率。', 1],
  ['p103', '103', '郑 某', 'Zheng Mou', '深圳', '科技', '到终点才知道，很多人一直在背后托着。', 3],
  ['p104', '104', '孙 某', 'Sun Mou', '广州', '能源', '风沙会筛掉口号，留下动作。', 4],
  ['p105', '105', '朱 某', 'Zhu Mou', '香港', '金融', '补给点是另一种课堂。', 2]
] as const

const rosterSurnames = [
  '田',
  '杨',
  '黄',
  '吴',
  '曹',
  '郭',
  '马',
  '罗',
  '梁',
  '韩',
  '唐',
  '谢',
  '邓',
  '萧',
  '彭',
  '袁',
  '蔡',
  '蒋',
  '叶',
  '钟',
  '汪',
  '姚',
  '钱'
]

const cities = ['北京', '上海', '深圳', '广州', '杭州', '香港']
const industries = ['金融', '制造', '互联网', '医疗', '消费', '能源', '媒体', '咨询', '地产', '科技']
const rosterQuotes = ['读戈一程。', '各自做企业，偶尔回到一桌。', '风沙之后，更愿坐下喝茶。']

const visitingGuests = [
  ['g01', 'G·01', '张 维 教授', 'Prof. Zhang Wei', '香港 · 港大', '经济 · 政治学', '商业不是博弈，是合作的高级形式。'],
  ['g04', 'G·04', '梁 某 校长', 'President Liang', '北京', '高等教育', 'EMBA 不只是学历，是一份名单。'],
  ['g05', 'G·05', '邹 某', 'Zou Mou', '深圳', '科技 / 创始人', '硬科技，慢生长。'],
  ['g06', 'G·06', '龙 某', 'Long Mou', '北京', '投资 / 一级', '耐心是一级市场的护城河。'],
  ['g07', 'G·07', '邵 某', 'Shao Mou', '上海', '品牌 / 内容', '把现场讲清楚，事情就会继续发生。'],
  ['g08', 'G·08', '顾 某', 'Gu Mou', '广州', '产业 / 供应链', '企业现场最能校准判断。'],
  ['g09', 'G·09', '许 某', 'Xu Mou', '深圳', '科技 / 产品', '产品是一连串取舍。'],
  ['g10', 'G·10', '任 某', 'Ren Mou', '香港', '公益 / 基金', '长期支持需要透明的记录。']
] as const

const faculty = [
  ['f01', 'F·01', '何 帆 教授', 'Prof. He Fan', '上海 · 复旦', '经济 / 写作', '看见慢变量。'],
  ['f02', 'F·02', '兰 小欢 教授', 'Prof. Lan Xiaohuan', '上海 · 复旦', '公共财政', '把账算清楚，再说政策。'],
  ['f03', 'F·03', '陈 某 教授', 'Prof. Chen Mou', '北京', '组织行为', '关系需要被行动校准。'],
  ['f04', 'F·04', '吴 某 导师', 'Mentor Wu Mou', '香港', '领导力 / 创业', '把同学网络变成真实支持。']
] as const

export const peopleFixtures: PublicPersonFixture[] = [
  ...classCouncil.map(([id, number, name, englishName, city, industry, quote, tone, related], index) =>
    makePerson({
      id,
      number,
      name,
      englishName,
      role: '同学',
      group: '班级团队 · Class Council',
      city,
      industry,
      quote,
      related: [...related],
      tone,
      category: 'classmate',
      title: '班级团队',
      organization: 'HKU-PKU EMBA 8A-194',
      bio: quote,
      featured: index < 3,
      sortOrder: index + 1
    })
  ),
  ...gobiSquad.map(([id, number, name, englishName, city, industry, quote, tone], index) =>
    makePerson({
      id,
      number,
      name,
      englishName,
      role: '同学',
      group: '戈21 出征 A 队 · Gobi Squad',
      city,
      industry,
      quote,
      related: ['№ 036 · 戈21 报名'],
      tone,
      category: 'classmate',
      title: '戈21 出征 A 队',
      organization: 'HKU-PKU EMBA 8A-194',
      bio: quote,
      sortOrder: 100 + index
    })
  ),
  ...rosterSurnames.map((surname, index) =>
    makePerson({
      id: `c${index + 201}`,
      number: String(index + 13).padStart(3, '0'),
      name: `${surname} 某`,
      englishName: `${surname} Mou`,
      role: '同学',
      group: '全班名册 · Class Roster (35)',
      city: cities[index % cities.length],
      industry: industries[index % industries.length],
      quote: rosterQuotes[index % rosterQuotes.length],
      related: ['№ 035 · 共赴春序'],
      tone: (index % 4) + 1,
      category: 'classmate',
      title: '班级同学',
      organization: 'HKU-PKU EMBA 8A-194',
      bio: rosterQuotes[index % rosterQuotes.length],
      sortOrder: 200 + index
    })
  ),
  ...visitingGuests.map(([id, number, name, englishName, city, industry, quote], index) =>
    makePerson({
      id,
      number,
      name,
      englishName,
      role: '嘉宾',
      group: '到访嘉宾 · Visiting Guests',
      city,
      industry,
      quote,
      related: ['№ 034 · 为港大戈21 加油'],
      tone: (index % 4) + 1,
      category: 'guest',
      title: '到访嘉宾',
      organization: city,
      bio: quote,
      sortOrder: 300 + index
    })
  ),
  ...faculty.map(([id, number, name, englishName, city, industry, quote], index) =>
    makePerson({
      id,
      number,
      name,
      englishName,
      role: '教授',
      group: '教授/导师 · Faculty Mentors',
      city,
      industry,
      quote,
      related: ['嘉宾对话 · Visiting Dialogues'],
      tone: ((index + 2) % 4) + 1,
      category: 'faculty',
      title: '教授/导师',
      organization: city,
      bio: quote,
      sortOrder: 400 + index
    })
  )
]
