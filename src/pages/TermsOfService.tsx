import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';

export default function TermsOfService() {
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
        <h1 className="font-cormorant text-4xl font-bold mb-8">Пользовательское соглашение</h1>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">1. Общие положения</h2>
            <p className="text-muted-foreground">
              Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между 
              KeyRider (далее — «Сервис») и пользователями (далее — «Пользователь») при использовании 
              платформы для аренды автомобилей с возможностью выкупа.
            </p>
            <p className="text-muted-foreground">
              Используя Сервис, Пользователь подтверждает, что ознакомился с условиями настоящего 
              Соглашения и принимает их в полном объеме.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">2. Определения</h2>
            <ul className="text-muted-foreground space-y-2">
              <li><strong>Арендатор</strong> — физическое лицо, использующее Сервис для поиска и аренды автомобилей.</li>
              <li><strong>Арендодатель</strong> — физическое лицо, предоставляющее свой автомобиль в аренду через Сервис.</li>
              <li><strong>Автомобиль</strong> — транспортное средство, размещенное на платформе для аренды.</li>
              <li><strong>Выкуп</strong> — возможность приобретения автомобиля после определенного периода аренды.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">3. Регистрация и учетная запись</h2>
            <p className="text-muted-foreground">
              3.1. Для использования полного функционала Сервиса Пользователь должен пройти регистрацию, 
              предоставив достоверные и актуальные данные.
            </p>
            <p className="text-muted-foreground">
              3.2. Пользователь несет ответственность за сохранность данных своей учетной записи и 
              самостоятельно несет ответственность за все действия, совершенные от его имени.
            </p>
            <p className="text-muted-foreground">
              3.3. Сервис оставляет за собой право заблокировать или удалить учетную запись Пользователя 
              при нарушении условий настоящего Соглашения.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">4. Услуги Сервиса</h2>
            <p className="text-muted-foreground">
              4.1. Сервис предоставляет платформу для размещения объявлений об аренде автомобилей и 
              поиска подходящих вариантов аренды.
            </p>
            <p className="text-muted-foreground">
              4.2. Сервис выступает посредником между Арендатором и Арендодателем и не несет 
              ответственности за качество предоставляемых автомобилей и исполнение обязательств сторонами.
            </p>
            <p className="text-muted-foreground">
              4.3. Все условия аренды, включая стоимость, залог, сроки и условия выкупа, определяются 
              Арендодателем и должны быть согласованы с Арендатором до заключения договора аренды.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">5. Обязанности Арендатора</h2>
            <p className="text-muted-foreground">
              5.1. Арендатор обязуется использовать автомобиль в соответствии с его назначением и 
              правилами дорожного движения.
            </p>
            <p className="text-muted-foreground">
              5.2. Арендатор несет полную ответственность за повреждения автомобиля, произошедшие в 
              период аренды, если иное не предусмотрено договором с Арендодателем.
            </p>
            <p className="text-muted-foreground">
              5.3. Арендатор обязуется своевременно вносить арендные платежи в соответствии с условиями 
              договора аренды.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">6. Обязанности Арендодателя</h2>
            <p className="text-muted-foreground">
              6.1. Арендодатель обязуется предоставлять достоверную информацию об автомобиле, включая 
              его техническое состояние, год выпуска, пробег и другие характеристики.
            </p>
            <p className="text-muted-foreground">
              6.2. Арендодатель гарантирует, что автомобиль исправен и пригоден для использования на 
              момент передачи Арендатору.
            </p>
            <p className="text-muted-foreground">
              6.3. Арендодатель обязуется предоставить все необходимые документы для законной эксплуатации 
              автомобиля.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">7. Ответственность</h2>
            <p className="text-muted-foreground">
              7.1. Сервис не несет ответственности за действия Пользователей, качество автомобилей и 
              исполнение обязательств по договорам аренды.
            </p>
            <p className="text-muted-foreground">
              7.2. Все споры между Арендатором и Арендодателем разрешаются сторонами самостоятельно.
            </p>
            <p className="text-muted-foreground">
              7.3. Сервис не несет ответственности за убытки, возникшие в результате использования 
              или невозможности использования платформы.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">8. Конфиденциальность</h2>
            <p className="text-muted-foreground">
              8.1. Сервис обязуется обеспечивать конфиденциальность персональных данных Пользователей 
              в соответствии с Политикой конфиденциальности.
            </p>
            <p className="text-muted-foreground">
              8.2. Пользователь соглашается на обработку своих персональных данных в соответствии с 
              законодательством Российской Федерации.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">9. Изменение условий</h2>
            <p className="text-muted-foreground">
              9.1. Сервис оставляет за собой право вносить изменения в настоящее Соглашение в любое время.
            </p>
            <p className="text-muted-foreground">
              9.2. Новая редакция Соглашения вступает в силу с момента ее размещения на сайте.
            </p>
            <p className="text-muted-foreground">
              9.3. Продолжение использования Сервиса после внесения изменений означает принятие новых условий.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">10. Заключительные положения</h2>
            <p className="text-muted-foreground">
              10.1. Настоящее Соглашение регулируется законодательством Российской Федерации.
            </p>
            <p className="text-muted-foreground">
              10.2. Все споры, возникающие из настоящего Соглашения, разрешаются в соответствии с 
              действующим законодательством РФ.
            </p>
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