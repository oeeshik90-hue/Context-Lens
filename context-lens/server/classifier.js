export function classify(text) {
  text = text.toLowerCase();
  if (text.includes('urgent') || text.includes('asap')) return 'Urgent';
  if (text.includes('todo') || text.includes('task')) return 'Task';
  return 'General';
}
