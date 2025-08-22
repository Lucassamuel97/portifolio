import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  increment,
  orderBy,
  query,
  where,
  Timestamp 
} from 'firebase/firestore';
import { logEvent } from 'firebase/analytics';
import { db, analytics } from './config';
import { ContactMessage } from '@/types';

// Serviços para mensagens de contato
export const contactService = {
  async submitMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) {
    try {
      const docRef = await addDoc(collection(db, 'contacts'), {
        ...message,
        createdAt: Timestamp.now(),
        status: 'unread'
      });
      
      // Log analytics event
      if (analytics) {
        logEvent(analytics, 'contact_form_submit', {
          contact_method: 'form'
        });
      }
      
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      return { success: false, error: 'Erro ao enviar mensagem' };
    }
  },

  async getMessages() {
    try {
      const q = query(
        collection(db, 'contacts'), 
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate()
      })) as ContactMessage[];
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
      return [];
    }
  },

  async markAsRead(messageId: string) {
    try {
      await updateDoc(doc(db, 'contacts', messageId), {
        status: 'read'
      });
      return { success: true };
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
      return { success: false };
    }
  }
};

// Serviços para projetos
export const projectService = {
  async incrementViews(projectId: string) {
    try {
      await updateDoc(doc(db, 'projects', projectId), {
        views: increment(1)
      });
      
      // Log analytics event
      if (analytics) {
        logEvent(analytics, 'project_view', {
          project_id: projectId
        });
      }
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao incrementar visualizações:', error);
      return { success: false };
    }
  },

  async getProjectViews(projectId: string) {
    try {
      const q = query(
        collection(db, 'projects'),
        where('id', '==', projectId)
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const projectData = querySnapshot.docs[0].data();
        return projectData.views || 0;
      }
      
      return 0;
    } catch (error) {
      console.error('Erro ao buscar visualizações:', error);
      return 0;
    }
  }
};

// Serviços para analytics
export const analyticsService = {
  trackPageView(pageName: string) {
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_name: pageName,
        page_location: window.location.href,
        page_title: document.title
      });
    }
  },

  trackEvent(eventName: string, parameters?: Record<string, string | number | boolean>) {
    if (analytics) {
      logEvent(analytics, eventName, parameters);
    }
  },

  trackDownload(fileName: string, fileType: string) {
    if (analytics) {
      logEvent(analytics, 'file_download', {
        file_name: fileName,
        file_type: fileType
      });
    }
  },

  trackOutboundClick(url: string, linkText?: string) {
    if (analytics) {
      logEvent(analytics, 'click', {
        link_url: url,
        link_text: linkText,
        outbound: true
      });
    }
  },

  trackUserEngagement(action: string, value?: number) {
    if (analytics) {
      logEvent(analytics, 'user_engagement', {
        engagement_time_msec: value,
        action: action
      });
    }
  }
};

// Serviço para estatísticas gerais
export const statsService = {
  async getGeneralStats() {
    try {
      // Buscar total de mensagens de contato
      const contactsSnapshot = await getDocs(collection(db, 'contacts'));
      const totalContacts = contactsSnapshot.size;

      // Buscar total de visualizações de projetos
      const projectsSnapshot = await getDocs(collection(db, 'projects'));
      let totalProjectViews = 0;
      
      projectsSnapshot.forEach(doc => {
        const data = doc.data();
        totalProjectViews += data.views || 0;
      });

      return {
        totalContacts,
        totalProjectViews,
        totalProjects: projectsSnapshot.size
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      return {
        totalContacts: 0,
        totalProjectViews: 0,
        totalProjects: 0
      };
    }
  }
};

// Utilitários
export const firebaseUtils = {
  formatTimestamp(timestamp: Timestamp | Date | string | number | null | undefined) {
    if (!timestamp) return '';
    
    let date: Date;
    
    if (timestamp instanceof Date) {
      date = timestamp;
    } else if (timestamp && typeof timestamp === 'object' && 'toDate' in timestamp) {
      // É um Timestamp do Firestore
      date = (timestamp as Timestamp).toDate();
    } else {
      // É string ou number
      date = new Date(timestamp as string | number);
    }
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  },

  validateFirebaseConfig() {
    const requiredVars = [
      'NEXT_PUBLIC_FIREBASE_API_KEY',
      'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
      'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
      'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
      'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
      'NEXT_PUBLIC_FIREBASE_APP_ID'
    ];

    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
      console.warn('Firebase configuration incomplete. Missing:', missing);
      return false;
    }
    
    return true;
  }
};

