import { Injectable, signal } from '@angular/core';
import { Child } from 'src/app/shared/models/child.model';
import { MOCK_CHILDREN } from 'src/app/shared/constants/mock-children.constant';

@Injectable({ providedIn: 'root' })
export class ChildService {
  private readonly children = signal<Child[]>([...MOCK_CHILDREN]);

  readonly all = this.children.asReadonly();

  getById(id: string): Child | undefined {
    return this.children().find((child) => child.id === id);
  }

  create(child: Omit<Child, 'id'>): Child {
    const created: Child = { ...child, id: this.generateId() };
    this.children.update((list) => [...list, created]);
    return created;
  }

  update(id: string, changes: Partial<Omit<Child, 'id'>>): void {
    this.children.update((list) =>
      list.map((child) => (child.id === id ? { ...child, ...changes } : child)),
    );
  }

  remove(id: string): void {
    this.children.update((list) => list.filter((child) => child.id !== id));
  }

  private generateId(): string {
    return `child-${crypto.randomUUID()}`;
  }
}
