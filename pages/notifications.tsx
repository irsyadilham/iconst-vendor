import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Back from '../components/back';
import { get } from '../functions/fetch';
import AppContext from '../context/app';
import type { Notification } from '../types/notification';

const Notifications: NextPage = () => {
  const router = useRouter();
  const context = useContext(AppContext);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const getNotification = async () => {
    try {
      context?.loading.dispatch({type: 'ON'});
      const notifications: Notification[] = await get('/notifications/vendor');
      context?.loading.dispatch({type: 'OFF'});
      setNotifications(notifications);
    } catch (err: any) {
      context?.loading.dispatch({type: 'OFF'});
      alert('Failed to retrieve notification, please try again later');
    }
  }

  const bgColor = (read: boolean) => {
    if (read) {
      return '';
    }
    return '#faf5ff'; //purple
  }

  const navigate = (notification: Notification, read: boolean) => {
    const push = (url: string) => {
      if (!read) {
        router.push({
          pathname: url,
          query: {
            notification: true,
            notification_id: notification.id
          }
        });
        return;
      }
      router.push(url);
    }
    const notificationType = notification.notification_type.name;
    if (notificationType === 'new job request') {
      push(`/jobs/${notification.job.id}`);
    } else if (notificationType === 'quotation approved') {
      push(`/jobs-accepted/${notification.job.id}`);
    } else if (notificationType === 'client accepted') {
      push(`/jobs-accepted/${notification.job.id}`);
    }
  }

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <main className="pt-3 pb-2">
      <div className="ml-2">
        <Back text="Back"/>
      </div>

      <h2 className="mt-2 font-bold text-2xl mx-2">Notifications</h2>

      <section className="space-y-[1.5em] mt-2"></section>
      {notifications.map((val, i) => {
        return (
          <section style={{backgroundColor: bgColor(val.read)}} onClick={() => navigate(val, val.read)} className="py-[1.3em] px-[1.7em] cursor-pointer" key={i}>
            <p className="text-[.75rem]">{val.date}</p>
            {(() => {
              const notificationType = val.notification_type.name;
              switch(notificationType) {
                case 'new job request':
                  return <p className="text-sm text-black mt-[.3em]">New service request available for <span className="text-primary font-semibold">{val.job.service.name}</span></p>;
                case 'quotation approved':
                  return <p className="text-sm text-black mt-[.3em]">Your quotation for <span className="text-primary font-semibold">{val.job.title}</span> has been approved</p>;
                case 'client accepted':
                  return <p className="text-sm text-black mt-[.3em]">Client accepted your offer for <span className="text-primary font-semibold">{val.job.title}</span></p>
              }
            })()}
          </section>
        );
      })}
    </main>
  );
}

export default Notifications;