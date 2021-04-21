

export type Status = 'SUCCESS' | 'FAILURE' | 'RUNNING' | 'ERROR' | null;

export const status = {
    SUCCESS: 'SUCCESS',
	FAILURE: 'FAILURE',
	RUNNING: 'RUNNING',
	ERROR: 'ERROR',
	NULL: null as Status,
}

export function isStatus(res: any): res is Status {
	return Object.values(status).includes(res);
}