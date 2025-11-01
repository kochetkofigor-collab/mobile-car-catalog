import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h2 className="font-cormorant text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-4">
              KEYRIDER
            </h2>
            <p className="text-muted-foreground text-sm mb-4">
              Сервис аренды автомобилей с возможностью выкупа
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Icon name="Download" size={16} />
                RuStore
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Навигация</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Каталог автомобилей
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  О сервисе
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Как это работает
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Для арендодателей</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Разместить автомобиль
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Условия размещения
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Поддержка
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Документы</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Пользовательское соглашение
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a href="/personal-data-consent" className="text-muted-foreground hover:text-primary transition-colors">
                  Согласие на обработку персональных данных
                </a>
              </li>
              <li>
                <a href="/third-party-consent" className="text-muted-foreground hover:text-primary transition-colors">
                  Согласие на передачу данных третьим лицам
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 KEYRIDER. Все права защищены.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Mail" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Phone" size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}