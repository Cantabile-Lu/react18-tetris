// 空白格子
import { List } from 'immutable';

export const blankLine: number[] = Array(10).fill(0);
// 填充行
export const fillLine: number[] = Array(10).fill(1);
// 空白矩阵
export const blankMatrix = List<number[]>(Array(20).fill(List(blankLine)));
