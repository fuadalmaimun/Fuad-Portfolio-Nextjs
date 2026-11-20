type ProjectWithDate = {
  createdAt?: string | number | Date;
  created_at?: string | number | Date;
  creationDate?: string | number | Date;
  _id?: string;
  id?: string | number;
};

function projectTimestamp(project: ProjectWithDate): number {
  const value = project.createdAt ?? project.created_at ?? project.creationDate;
  if (value) {
    const timestamp = new Date(value).getTime();
    if (Number.isFinite(timestamp)) return timestamp;
  }

  // Mongo ObjectIds encode their creation time in the first eight hex digits.
  const id = String(project._id ?? project.id ?? "");
  if (/^[a-f\d]{24}$/i.test(id)) return Number.parseInt(id.slice(0, 8), 16) * 1000;
  return 0;
}

export function sortProjectsNewestFirst<T extends ProjectWithDate>(projects: T[]): T[] {
  return [...projects].sort((a, b) => projectTimestamp(b) - projectTimestamp(a));
}
