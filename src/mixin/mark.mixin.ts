import Vue from 'vue'
import Component from 'vue-class-component'
import { SelectElement, ImplSelectElement } from '@/types/index'

@Component
export default class MarkMixin extends Vue {
  public marks: Array<SelectElement> = [
    new ImplSelectElement('Ширина ленты', 'tape-width'),
    new ImplSelectElement('Длина конвейера', 'tape-length'),
    new ImplSelectElement('Производительность', 'productivity'),
    new ImplSelectElement('Угол наклона', 'tilt-angle'),
    new ImplSelectElement('Скорость ленты', 'tape-speed'),
    new ImplSelectElement('Насыпная масса', 'bulk'),
    new ImplSelectElement('Гранулометрический состав', 'grading'),
    new ImplSelectElement('Состав фракции', 'fraction'),
    new ImplSelectElement('Содержание влаги', 'moisture'),
    new ImplSelectElement('Температура перевозимого груза', 'temperature-cargo'),
    new ImplSelectElement('Система управления конвейером', 'conveyor-control-system'),
    new ImplSelectElement('Шеф-монтаж конвейера', 'installation-chief'),
    new ImplSelectElement('Диапазон температуры окружающего воздуха', 'temperature-range'),
    new ImplSelectElement('Влажность окружающего воздуха', 'humidity-air'),
    new ImplSelectElement('Содержание пыли в зоне расположения приводного барабана', 'dust'),
  ]
}
