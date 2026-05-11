'use client'

import { useState } from 'react'

interface ContactEmailFormProps {
  targetEmail: string
  note: string
}

const roleOptions = [
  { value: '同学', label: '8A-194 同学' },
  { value: '嘉宾', label: '受邀嘉宾' },
  { value: '校友', label: '校友 / 友班' },
  { value: '媒体', label: '媒体 / 合作' },
  { value: '其他', label: '其他' }
]

const topicOptions = [
  { value: '投稿', label: '投稿 / 勘误' },
  { value: '活动', label: '活动协作' },
  { value: '转载', label: '内容转载' },
  { value: '其他', label: '其他' }
]

export function ContactEmailForm({ targetEmail, note }: ContactEmailFormProps) {
  const [role, setRole] = useState('同学')
  const [topic, setTopic] = useState('投稿')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'drafted'>('idle')

  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault()

        const body = [
          `身份：${role}`,
          `姓名：${name || '未填写'}`,
          `邮箱：${email || '未填写'}`,
          `主题：${topic}`,
          '',
          message || '未填写正文'
        ].join('\n')

        window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(
          `8A-194 班联系：${topic}`
        )}&body=${encodeURIComponent(body)}`
        setStatus('drafted')
      }}
    >
      <h2 className="serif">写一封信 / Write a letter</h2>

      <div className="field">
        <label>
          身份 <em>*</em>
        </label>
        <div className="field-row" role="group" aria-label="身份">
          {roleOptions.map((option) => (
            <button
              className={role === option.value ? 'opt on' : 'opt'}
              key={option.value}
              onClick={() => setRole(option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label>
          姓名 <em>*</em>
        </label>
        <input
          autoComplete="name"
          onChange={(event) => setName(event.target.value)}
          placeholder="如何称呼您 / Your name"
          type="text"
          value={name}
        />
      </div>

      <div className="field">
        <label>
          邮箱 <em>*</em>
        </label>
        <input
          autoComplete="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="your-name@domain.com"
          required
          type="email"
          value={email}
        />
      </div>

      <div className="field">
        <label>主题</label>
        <div className="field-row" role="group" aria-label="主题">
          {topicOptions.map((option) => (
            <button
              className={topic === option.value ? 'opt on' : 'opt'}
              key={option.value}
              onClick={() => setTopic(option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label>
          正文 <em>*</em>
        </label>
        <textarea
          onChange={(event) => setMessage(event.target.value)}
          placeholder="请简要描述您的来意。如有附件，可附下载链接。"
          required
          value={message}
        />
      </div>

      <div className="submit-row">
        <button className="btn solid" type="submit">
          寄出 / Send <span>→</span>
        </button>
        <small>编辑部将于 7 个工作日内回复 · within 7 working days</small>
      </div>

      <p className="contact-mail-note">
        {note}
      </p>
      {status === 'drafted' ? (
        <p aria-live="polite" className="contact-mail-note">
          已为你生成邮件草稿，请在邮件客户端中确认发送。
        </p>
      ) : null}
    </form>
  )
}
