import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';

export default function ThirdPartyConsent() {
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
                className="hover:bg-primary/10 active:bg-primary/20 active:scale-95 transition-all"
              >
                <Icon name="ArrowLeft" size={20} className="text-foreground" />
              </Button>
              <Logo size="md" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-cormorant text-4xl font-bold mb-8">
          Согласие на передачу персональных данных третьим лицам
        </h1>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <section>
            <p className="text-muted-foreground">
              Я, субъект персональных данных, в соответствии с Федеральным законом от 27.07.2006 
              № 152-ФЗ «О персональных данных» даю согласие KeyRider (далее — «Оператор») на 
              передачу моих персональных данных третьим лицам на условиях, указанных ниже.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">1. Категории третьих лиц</h2>
            <p className="text-muted-foreground mb-3">
              Настоящим даю согласие на передачу моих персональных данных следующим категориям 
              третьих лиц:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li><strong>Арендодатели и арендаторы:</strong> физические лица, зарегистрированные 
              на платформе KeyRider, с которыми заключаются договоры аренды автомобилей</li>
              <li><strong>Платежные системы и банки:</strong> для обеспечения финансовых операций 
              и расчетов</li>
              <li><strong>Страховые компании:</strong> для оформления страховых полисов на арендованные 
              автомобили</li>
              <li><strong>Партнеры по верификации:</strong> для проверки достоверности документов и 
              предотвращения мошенничества</li>
              <li><strong>Сервисы связи:</strong> для отправки уведомлений по электронной почте и SMS</li>
              <li><strong>Аналитические сервисы:</strong> для улучшения работы платформы (анонимизированные данные)</li>
              <li><strong>Государственные органы:</strong> по официальным запросам в соответствии с 
              законодательством РФ</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">2. Перечень передаваемых данных</h2>
            <p className="text-muted-foreground mb-3">
              Третьим лицам могут быть переданы следующие персональные данные:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li><strong>Арендодателям и арендаторам:</strong> имя, фамилия, номер телефона, адрес 
              электронной почты, данные водительского удостоверения</li>
              <li><strong>Платежным системам:</strong> имя, фамилия, данные для проведения платежей</li>
              <li><strong>Страховым компаниям:</strong> ФИО, дата рождения, паспортные данные, данные 
              водительского удостоверения</li>
              <li><strong>Партнерам по верификации:</strong> паспортные данные, фотографии документов</li>
              <li><strong>Сервисам связи:</strong> номер телефона, адрес электронной почты</li>
              <li><strong>Государственным органам:</strong> все данные по официальному запросу</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">3. Цели передачи данных</h2>
            <p className="text-muted-foreground mb-3">
              Персональные данные передаются третьим лицам в следующих целях:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>Обеспечение взаимодействия между участниками сделок аренды</li>
              <li>Заключение и исполнение договоров аренды автомобилей</li>
              <li>Проведение финансовых операций и расчетов</li>
              <li>Оформление страховых полисов</li>
              <li>Проверка достоверности документов и предотвращение мошенничества</li>
              <li>Отправка информационных уведомлений</li>
              <li>Улучшение качества услуг платформы</li>
              <li>Исполнение требований законодательства РФ</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">4. Условия передачи данных</h2>
            <p className="text-muted-foreground">
              Оператор обязуется:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>Передавать третьим лицам только те персональные данные, которые необходимы для 
              достижения указанных целей</li>
              <li>Требовать от третьих лиц соблюдения конфиденциальности и безопасности персональных данных</li>
              <li>Заключать с третьими лицами соглашения, обязывающие их защищать персональные данные</li>
              <li>Контролировать соблюдение третьими лицами условий обработки персональных данных</li>
              <li>Не передавать персональные данные третьим лицам в рекламных целях без отдельного 
              согласия субъекта</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">5. Трансграничная передача данных</h2>
            <p className="text-muted-foreground">
              Персональные данные могут передаваться на территорию иностранных государств в случаях, 
              когда третьи лица (например, платежные системы или облачные сервисы) располагаются за 
              пределами Российской Федерации. При трансграничной передаче данных Оператор обеспечивает 
              адекватную защиту прав субъектов персональных данных.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">6. Обязательства третьих лиц</h2>
            <p className="text-muted-foreground">
              Третьи лица, получающие персональные данные, обязуются:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>Использовать персональные данные только для целей, указанных при передаче</li>
              <li>Обеспечивать конфиденциальность и безопасность персональных данных</li>
              <li>Не передавать персональные данные другим лицам без согласия Оператора и субъекта</li>
              <li>Уничтожить персональные данные после достижения целей обработки или по требованию 
              Оператора</li>
              <li>Соблюдать требования законодательства РФ о персональных данных</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">7. Срок действия согласия</h2>
            <p className="text-muted-foreground">
              Согласие на передачу персональных данных третьим лицам действует с момента его 
              предоставления и до момента отзыва. Отзыв согласия осуществляется путем направления 
              письменного заявления Оператору на адрес электронной почты support@keyrider.ru или 
              через личный кабинет на платформе.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">8. Последствия отзыва согласия</h2>
            <p className="text-muted-foreground">
              При отзыве согласия на передачу персональных данных третьим лицам:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>Оператор прекращает передачу персональных данных третьим лицам</li>
              <li>Уже переданные данные продолжают обрабатываться третьими лицами до завершения 
              текущих сделок</li>
              <li>Использование некоторых функций платформы может быть ограничено или невозможно</li>
              <li>Заключение новых договоров аренды может стать невозможным</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">9. Права субъекта персональных данных</h2>
            <p className="text-muted-foreground mb-3">
              Я проинформирован(а) о своих правах:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>Получать информацию о том, каким третьим лицам были переданы мои персональные данные</li>
              <li>Требовать прекращения передачи персональных данных третьим лицам</li>
              <li>Отозвать настоящее согласие в любое время</li>
              <li>Обжаловать действия Оператора и третьих лиц в уполномоченный орган по защите 
              прав субъектов персональных данных или в судебном порядке</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">10. Контактная информация</h2>
            <p className="text-muted-foreground">
              Для реализации своих прав и по всем вопросам, связанным с передачей персональных данных 
              третьим лицам, вы можете обратиться:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>Наименование: KeyRider</li>
              <li>Email: support@keyrider.ru</li>
              <li>Телефон: +7 (XXX) XXX-XX-XX</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">11. Подтверждение</h2>
            <p className="text-muted-foreground">
              Регистрируясь на платформе KeyRider и используя ее функционал, я подтверждаю, что:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>Ознакомлен(а) с условиями передачи моих персональных данных третьим лицам</li>
              <li>Даю согласие на передачу моих персональных данных на указанных выше условиях</li>
              <li>Понимаю цели и последствия передачи данных</li>
              <li>Осведомлен(а) о своих правах и способах их реализации</li>
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