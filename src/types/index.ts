export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  category: 'web' | 'mobile' | 'desktop' | 'api' | 'library';
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  views?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: {
    start: Date;
    end: Date | null; // null for current job
  };
  description: string;
  responsibilities: string[];
  technologies: string[];
  type: 'full-time' | 'part-time' | 'freelance' | 'contract' | 'internship';
  achievements?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  institutionUrl?: string;
  location: string;
  period: {
    start: Date;
    end: Date | null;
  };
  description?: string;
  gpa?: string;
  honors?: string[];
  relevantCourses?: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'database' | 'devops' | 'tools' | 'other';
  level: number; // 1-100
  icon?: string;
  experience: string; // e.g., "2 years"
  projects?: string[]; // project IDs where this skill was used
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  status: 'unread' | 'read' | 'replied';
  userAgent?: string;
  ipAddress?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username?: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

export interface Analytics {
  pageViews: number;
  uniqueVisitors: number;
  projectViews: Record<string, number>;
  contactFormSubmissions: number;
  topReferrers: Array<{ url: string; count: number }>;
  deviceTypes: Record<string, number>;
  geolocation: Record<string, number>;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  avatar: string;
  resume?: string;
  timezone: string;
  languages: Array<{ language: string; level: string }>;
  interests: string[];
  availability: 'available' | 'busy' | 'not-available';
}

export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
}

export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
  repeat?: boolean | number;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
  progress?: number;
}

export interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  children: React.ReactNode;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  value?: string;
  onChange?: (value: string) => void;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  href?: string;
  external?: boolean;
  className?: string;
  children?: React.ReactNode;
  hover?: boolean;
  clickable?: boolean;
}

export interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export interface TooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  children: React.ReactNode;
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

export interface TimelineItem {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  description?: string;
  icon?: React.ReactNode;
  color?: string;
  link?: string;
}

// Google Analytics gtag function type
export interface GtagFunction {
  (command: 'config', targetId: string, config?: Record<string, unknown>): void;
  (command: 'event', eventName: string, config?: Record<string, unknown>): void;
  (command: 'js', date: Date): void;
  (command: string, ...args: unknown[]): void;
}

export interface WindowWithGtag extends Window {
  gtag?: GtagFunction;
}

