export const sortByArray = <T, X>(
	arr: T[],
	propertySelector: (element: T) => X,
	comparator: (a: X, b: X) => number
): T[] => {
	return arr.sort((a, b) => {
		const projectedA = propertySelector(a);
		const projectedB = propertySelector(b);

		return comparator(projectedA, projectedB);
	});
};
