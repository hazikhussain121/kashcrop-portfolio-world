type RectLike = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type SetterLike<T> = {
  xTo: T | null;
  yTo: T | null;
};

export function computeMagneticTransform(
  rect: RectLike,
  clientX: number,
  clientY: number,
  strength: number
) {
  const dx = clientX - (rect.left + rect.width / 2);
  const dy = clientY - (rect.top + rect.height / 2);

  return {
    x: dx * strength,
    y: dy * strength,
  };
}

export function resetMagneticSetters<T>(_setters: SetterLike<T>): SetterLike<T> {
  return {
    xTo: null,
    yTo: null,
  };
}
