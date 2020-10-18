export interface Message {
  type: 'conversation' | 'push' | 'facebook' | 'twitter' | 'email'
  id: string
  subject?: string
  body: string
  author: object
  attachments: any[]
  url: string
}

export interface User extends Omit<Visitor, 'type'> {
  type: 'user' | 'contact'
  signed_up_at: string
  email: string
  phone: string
  session_count: Number
  pseudonym?: string
  companies: Array<object>
  referrer?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

export type Component = 
  TextComponent 
  | DataTableComponent 
  | Spacer
  | ImageComponent
  | ButtonComponent
  | DropdownComponent
  | InputOption
  | TextArea

export interface InputOption {
  type: 'input'
  id: string
  label?: string
  value?: string
  placeholder?: string
  disabled?: true
}

export interface TextArea {
  type: 'textarea'
  id: string
  label: string
  placeholder?: string
  value?: string
  error?: true
  disabled?: true
}

export interface DropdownOption {
  type: 'option'
  id: string
  text: string
  disabled?: true
}

export interface DropdownComponent {
  type: 'dropdown'
  id: string
  options: DropdownOption[]
  label?: string
  value?: string
  save_state?: 'unsaved' | 'saved' | 'failed'
  disabled?: boolean
}

export interface TextComponent {
  type: 'text'
  text: string
  align?: 'left' | 'center' | 'right'
  style?: 'muted' | 'paragraph' | 'header' | 'error'
  bottom_margin?: 'none'
}

export interface ButtonComponent {
  type: 'button'
  id: string
  label: string
  disabled?: boolean
  style?: 'secondary'
  action: {
    type: 'url'
    url: string
  } | {
    type: 'submit',
  }
}

export interface DataTableComponent {
  type: 'data-table'
  items: DataTableFieldValue[]
}

export interface ImageComponent {
  type: 'image'
  url: string
  width: number
  height: number
  margin?: 'none'
  align?: 'left' | 'center' | 'right' | 'full_width'
}

export interface Spacer {
  type: 'spacer'
  size: 's' | 'm' | 'l' | 'xl'
}

export interface DataTableFieldValue {
  type: 'field-value'
  field: string
  value: string
}

export interface Visitor {
  type: 'visitor'
  id: string
  created_at: string
  user_id: string
  name: string
  custom_attributes: any
  last_request_at: string
  avatar: any
  unsubscribed_from_emails: Boolean
  location_data: any
  social_profiles: Array<any>
  segments: Array<any>
  tags: Array<any>
}

export type Admin = {
  type: 'admin'
  id: string
  name: string
  email: string
  job_title?: string
  away_mode_enabled: boolean
  away_mode_reassign: boolean
  has_inbox_seat: boolean
  team_ids: Array<any>
  avatar: string
} | {
  type: 'nobody_admin',
  id: null
}

export interface Conversation {
  type: 'conversation'
  id: string
  created_at: string
  updated_at: string
  waiting_since: string
  snoozed_until: string
  source: Message
  user: User
  open: boolean
  state: 'open' | 'closed' | 'snoozed'
  assignee: Admin
  conversation_parts: {
    conversation_parts: ConversationPart[]
  }
}

export interface ConversationPart {
  type: 'conversation_part'
  id: string
  part_type: string
  body: string
  created_at: string
  updated_at: string
  notified_at: string
  assigned_to: string
  author: string
  attachments: any[]
}
