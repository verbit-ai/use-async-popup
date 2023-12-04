import {
	AsyncPopupComponent,
	AsyncPopupComponentPureProps,
	AsyncPopupComponentReturnType,
	AsyncPopupResolveFn,
	AsyncPopupReturnPromise,
	ResolveRef,
} from "./types";

export type CreatePopupProps<TComponent extends AsyncPopupComponent> = {
	PopupComponent: TComponent;
	componentProps: AsyncPopupComponentPureProps<TComponent>;
	onResolve?: AsyncPopupResolveFn<AsyncPopupComponentReturnType<TComponent>>;
};

export const createPopup = <TComponent extends AsyncPopupComponent>(
	props: CreatePopupProps<TComponent>
): [React.ComponentType, AsyncPopupReturnPromise<TComponent>] => {
	const { PopupComponent, componentProps, onResolve: onResolveProp } = props;

	const resolveRef: ResolveRef<AsyncPopupComponentReturnType<TComponent>> = {
		current: () => {
			throw new Error(
				"Something went wrong. This function mustn't be called!"
			);
		},
	};

	const promise = new Promise<AsyncPopupComponentReturnType<TComponent>>(
		(r) => {
			resolveRef.current = r;
		}
	);

	const onResolve = (result: AsyncPopupComponentReturnType<TComponent>) => {
		onResolveProp?.(result);
		resolveRef.current(result);
	};

	function Popup() {
		// @ts-ignore
		return <PopupComponent {...componentProps} onResolve={onResolve} />;
	}

	return [Popup, promise];
};
