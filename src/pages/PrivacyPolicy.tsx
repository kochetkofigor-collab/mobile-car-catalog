import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <Logo size="md" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-cormorant text-4xl font-bold mb-8">Политика конфиденциальности</h1>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">1. Общие положения</h2>
            <p className="text-muted-foreground">
              Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки 
              и защиты персональных данных пользователей сервиса KeyRider (далее — «Сервис»).
            </p>
            <p className="text-muted-foreground">
              Используя Сервис, вы соглашаетесь с условиями настоящей Политики и даете согласие на 
              обработку своих персональных данных.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">2. Собираемые данные</h2>
            <p className="text-muted-foreground mb-3">Сервис собирает следующие категории персональных данных:</p>
            <ul className="text-muted-foreground space-y-2">
              <li><strong>Регистрационные данные:</strong> имя, фамилия, адрес электронной почты, номер телефона</li>
              <li><strong>Документы:</strong> данные паспорта, водительского удостоверения (для арендаторов и арендодателей)</li>
              <li><strong>Информация об автомобиле:</strong> марка, модель, год выпуска, фотографии, технические характеристики</li>
              <li><strong>Платежная информация:</strong> данные о транзакциях, способах оплаты</li>
              <li><strong>Технические данные:</strong> IP-адрес, тип браузера, операционная система, файлы cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">3. Цели обработки данных</h2>
            <p className="text-muted-foreground mb-3">Персональные данные обрабатываются в следующих целях:</p>
            <ul className="text-muted-foreground space-y-2">
              <li>Регистрация и авторизация пользователей</li>
              <li>Предоставление доступа к функционалу Сервиса</li>
              <li>Обеспечение связи между арендаторами и арендодателями</li>
              <li>Проведение финансовых операций и расчетов</li>
              <li>Проверка достоверности информации и предотвращение мошенничества</li>
              <li>Улучшение качества услуг и разработка новых функций</li>
              <li>Направление информационных и рекламных материалов (при согласии пользователя)</li>
              <li>Соблюдение требований законодательства РФ</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">4. Правовые основания обработки</h2>
            <p className="text-muted-foreground">
              Обработка персональных данных осуществляется на основании:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>Согласия субъекта персональных данных</li>
              <li>Заключения и исполнения договора, стороной которого является субъект персональных данных</li>
              <li>Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных»</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">5. Передача данных третьим лицам</h2>
            <p className="text-muted-foreground">
              Сервис может передавать персональные данные третьим лицам в следующих случаях:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li><strong>Арендодателям и арендаторам:</strong> для обеспечения связи и заключения договоров аренды</li>
              <li><strong>Платежным системам:</strong> для проведения финансовых операций</li>
              <li><strong>Партнерам:</strong> для предоставления дополнительных услуг (страхование, техподдержка)</li>
              <li><strong>Государственным органам:</strong> по требованию законодательства РФ</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              Все третьи лица обязаны соблюдать конфиденциальность переданных данных.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">6. Защита персональных данных</h2>
            <p className="text-muted-foreground">
              Сервис применяет организационные и технические меры для защиты персональных данных:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>Шифрование данных при передаче (SSL/TLS протоколы)</li>
              <li>Ограничение доступа к персональным данным</li>
              <li>Регулярное резервное копирование данных</li>
              <li>Мониторинг и аудит безопасности</li>
              <li>Обучение сотрудников правилам обработки персональных данных</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">7. Cookies и технологии отслеживания</h2>
            <p className="text-muted-foreground">
              Сервис использует файлы cookies для улучшения работы платформы, персонализации контента 
              и сбора статистики использования. Вы можете настроить браузер для блокировки cookies, 
              однако это может ограничить функциональность Сервиса.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">8. Права субъектов персональных данных</h2>
            <p className="text-muted-foreground mb-3">Вы имеете право:</p>
            <ul className="text-muted-foreground space-y-2">
              <li>Получать информацию о своих персональных данных, обрабатываемых Сервисом</li>
              <li>Требовать уточнения, блокирования или удаления недостоверных или незаконно обрабатываемых данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
              <li>Обжаловать действия Сервиса в уполномоченном органе по защите прав субъектов персональных данных</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              Для реализации указанных прав направьте запрос на адрес электронной почты: support@keyrider.ru
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">9. Хранение персональных данных</h2>
            <p className="text-muted-foreground">
              Персональные данные хранятся в течение срока, необходимого для достижения целей обработки, 
              либо до момента отзыва согласия на обработку. После достижения целей обработки или отзыва 
              согласия данные удаляются или обезличиваются.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">10. Изменение политики</h2>
            <p className="text-muted-foreground">
              Сервис оставляет за собой право вносить изменения в настоящую Политику. Новая редакция 
              вступает в силу с момента ее размещения на сайте. Рекомендуем регулярно проверять 
              обновления Политики.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">11. Контактная информация</h2>
            <p className="text-muted-foreground">
              По вопросам обработки персональных данных вы можете обратиться:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>Email: support@keyrider.ru</li>
              <li>Телефон: +7 (XXX) XXX-XX-XX</li>
            </ul>
          </section>

          <section className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Дата последнего обновления: 01 ноября 2024 г.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}