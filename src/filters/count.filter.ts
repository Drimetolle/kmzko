import Vue from 'vue'

export default function pieceFilter(value: number | undefined): string {
  return !!value ? `×${value}` : '×1'
}
