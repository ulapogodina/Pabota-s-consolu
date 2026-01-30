import * as readlineSync from 'readline-sync';
import { Calculator } from './calculator';
import { MenuItem, Operation, CalculationResult } from './types';

class ConsoleApp {
  private calculator: Calculator;
  private menuItems: MenuItem[];
  private isRunning: boolean;

  constructor() {
    this.calculator = new Calculator();
    this.isRunning = true;
    this.initializeMenu();
  }

  /**
   * Инициализация меню программы
   */
  private initializeMenu(): void {
    this.menuItems = [
      { id: 1, title: 'Сложение', operation: 'add' },
      { id: 2, title: 'Вычитание', operation: 'subtract' },
      { id: 3, title: 'Умножение', operation: 'multiply' },
      { id: 4, title: 'Деление', operation: 'divide' },
      { id: 5, title: 'Возведение в степень', operation: 'power' },
      { id: 0, title: 'Выход', operation: 'exit' }
    ];
  }

  /**
   * Отображение главного меню
   */
  private displayMenu(): void {
    console.log('\n' + '='.repeat(50));
    console.log('ПРАКТИЧЕСКАЯ РАБОТА №2 «РАБОТА С КОНСОЛЬЮ»');
    console.log('='.repeat(50));
    console.log('\nГлавное меню:');
    
    this.menuItems.forEach(item => {
      console.log(`${item.id}. ${item.title}`);
    });
    
    console.log('');
  }

  /**
   * Ввод числа с валидацией
   */
  private inputNumber(prompt: string): number {
    while (true) {
      const input = readlineSync.question(prompt);
      const number = parseFloat(input);
      
      if (!isNaN(number)) {
        return number;
      }
      
      console.log('Ошибка: Введите корректное число!');
    }
  }

  /**
   * Выполнение операции калькулятора
   */
  private performOperation(operation: Operation): void {
    console.log('\n' + '-'.repeat(50));
    
    let result: CalculationResult;
    
    switch (operation) {
      case 'add':
        const a1 = this.inputNumber('Введите первое число: ');
        const b1 = this.inputNumber('Введите второе число: ');
        result = this.calculator.add(a1, b1);
        console.log(`Результат: ${a1} + ${b1} = ${result.value}`);
        break;
        
      case 'subtract':
        const a2 = this.inputNumber('Введите первое число: ');
        const b2 = this.inputNumber('Введите второе число: ');
        result = this.calculator.subtract(a2, b2);
        console.log(`Результат: ${a2} - ${b2} = ${result.value}`);
        break;
        
      case 'multiply':
        const a3 = this.inputNumber('Введите первое число: ');
        const b3 = this.inputNumber('Введите второе число: ');
        result = this.calculator.multiply(a3, b3);
        console.log(`Результат: ${a3} * ${b3} = ${result.value}`);
        break;
        
      case 'divide':
        const a4 = this.inputNumber('Введите первое число: ');
        const b4 = this.inputNumber('Введите второе число: ');
        result = this.calculator.divide(a4, b4);
        
        if (result.success) {
          console.log(`Результат: ${a4} / ${b4} = ${result.value}`);
        } else {
          console.log(result.error);
        }
        break;
        
      case 'power':
        const base = this.inputNumber('Введите основание: ');
        const exponent = this.inputNumber('Введите степень: ');
        result = this.calculator.power(base, exponent);
        console.log(`Результат: ${base} ^ ${exponent} = ${result.value}`);
        break;
        
      case 'exit':
        this.isRunning = false;
        console.log('Спасибо за использование программы! До свидания!');
        return;
    }
    
    // Пауза перед возвращением в меню
    readlineSync.question('\nНажмите Enter для продолжения...');
  }

  /**
   * Основной цикл программы
   */
  public run(): void {
    console.log('Добро пожаловать в программу "Калькулятор"!');
    
    while (this.isRunning) {
      this.displayMenu();
      
      // Ввод выбора пользователя
      const choice = readlineSync.question('Выберите операцию (введите номер): ');
      const choiceNumber = parseInt(choice);
      
      // Поиск выбранного пункта меню
      const selectedMenuItem = this.menuItems.find(item => item.id === choiceNumber);
      
      if (selectedMenuItem) {
        this.performOperation(selectedMenuItem.operation);
      } else {
        console.log('\nОшибка: Неверный выбор! Пожалуйста, введите номер из меню.');
        readlineSync.question('Нажмите Enter для продолжения...');
      }
    }
  }
}

// Запуск приложения
const app = new ConsoleApp();
app.run();
