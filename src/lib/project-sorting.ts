type ProjectWithDate = {
  createdAt?: string | number | Date;
  created_at?: string | number | Date;
  creationDate?: string | number | Date;
  _id?: string;
  id?: string | number;
};

type ProjectWithOrder = ProjectWithDate & {
  order?: number | string | null;
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

function projectNumber(project: ProjectWithOrder): number {
  const raw = project.order;
  if (raw === undefined || raw === null || raw === "") return Number.MAX_SAFE_INTEGER;
  const parsed = typeof raw === "number" ? raw : Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : Number.MAX_SAFE_INTEGER;
}

export function sortProjectsNewestFirst<T extends ProjectWithDate>(projects: T[]): T[] {
  return [...projects].sort((a, b) => projectTimestamp(b) - projectTimestamp(a));
}

/** Sort projects by their dashboard "project number", keeping unnumbered ones last. */
export function sortProjectsByDisplayOrder<T extends ProjectWithOrder>(projects: T[]): T[] {
  return [...projects].sort((a, b) => {
    const orderA = projectNumber(a);
    const orderB = projectNumber(b);
    if (orderA !== orderB) return orderA - orderB;
    return projectTimestamp(b) - projectTimestamp(a);
  });
}
