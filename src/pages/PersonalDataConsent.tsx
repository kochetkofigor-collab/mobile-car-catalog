import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Footer from '@/components/Footer';

export default function PersonalDataConsent() {
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
              <h1 className="font-cormorant text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                KEYRIDER
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-cormorant text-4xl font-bold mb-8">Согласие на обработку персональных данных</h1>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <section>
            <p className="text-muted-foreground">
              Я, субъект персональных данных, в соответствии с Федеральным законом от 27.07.2006 
              № 152-ФЗ «О персональных данных» свободно, своей волей и в своем интересе даю согласие 
              KeyRider (далее — «Оператор») на обработку моих персональных данных.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">1. Перечень персональных данных</h2>
            <p className="text-muted-foreground mb-3">
              Настоящим даю согласие на обработку следующих персональных данных:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>Фамилия, имя, отчество</li>
              <li>Дата рождения</li>
              <li>Адрес электронной почты</li>
              <li>Номер телефона</li>
              <li>Паспортные данные</li>
              <li>Данные водительского удостоверения</li>
              <li>Адрес регистрации и фактического проживания</li>
              <li>Фотографии документов и автомобилей</li>
              <li>Информация об автомобиле (марка, модель, год, номер, технические характеристики)</li>
              <li>Данные о финансовых операциях</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">2. Цели обработки</h2>
            <p className="text-muted-foreground mb-3">
              Персональные данные обрабатываются в следующих целях:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>Регистрация и идентификация пользователя на платформе KeyRider</li>
              <li>Предоставление доступа к функционалу Сервиса</li>
              <li>Организация взаимодействия между арендаторами и арендодателями</li>
              <li>Заключение и исполнение договоров аренды автомобилей</li>
              <li>Проведение финансовых расчетов</li>
              <li>Проверка достоверности предоставленной информации</li>
              <li>Предотвращение мошеннических действий</li>
              <li>Обеспечение безопасности пользователей</li>
              <li>Информирование о новых услугах и специальных предложениях</li>
              <li>Улучшение качества услуг</li>
              <li>Соблюдение требований законодательства РФ</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">3. Способы обработки</h2>
            <p className="text-muted-foreground mb-3">
              Согласие распространяется на следующие способы обработки персональных данных:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>Сбор, запись, систематизация, накопление</li>
              <li>Хранение, уточнение (обновление, изменение)</li>
              <li>Извлечение, использование</li>
              <li>Передача (предоставление, доступ)</li>
              <li>Обезличивание, блокирование, удаление, уничтожение</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              Обработка персональных данных осуществляется как автоматизированным, так и 
              неавтоматизированным способом с использованием средств вычислительной техники.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">4. Срок действия согласия</h2>
            <p className="text-muted-foreground">
              Согласие действует с момента его предоставления и до момента его отзыва путем направления 
              письменного заявления Оператору. После отзыва согласия Оператор прекращает обработку 
              персональных данных и уничтожает их в срок, не превышающий 30 дней с даты получения 
              отзыва, если иное не предусмотрено законодательством РФ.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">5. Права субъекта персональных данных</h2>
            <p className="text-muted-foreground mb-3">
              Я проинформирован(а) о своих правах:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>Получать информацию, касающуюся обработки моих персональных данных</li>
              <li>Требовать уточнения, блокирования или уничтожения персональных данных в случае их 
              недостоверности, незаконности обработки</li>
              <li>Отозвать настоящее согласие в любое время</li>
              <li>Обжаловать действия или бездействие Оператора в уполномоченный орган по защите 
              прав субъектов персональных данных или в судебном порядке</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">6. Контактная информация Оператора</h2>
            <p className="text-muted-foreground">
              Для реализации своих прав и по всем вопросам, связанным с обработкой персональных данных, 
              вы можете обратиться:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>Наименование: KeyRider</li>
              <li>Email: support@keyrider.ru</li>
              <li>Телефон: +7 (XXX) XXX-XX-XX</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">7. Подтверждение</h2>
            <p className="text-muted-foreground">
              Регистрируясь на платформе KeyRider и используя ее функционал, я подтверждаю, что:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>Ознакомлен(а) с условиями обработки моих персональных данных</li>
              <li>Даю согласие на обработку моих персональных данных на указанных выше условиях</li>
              <li>Понимаю последствия отзыва согласия</li>
              <li>Осведомлен(а) о своих правах</li>
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
