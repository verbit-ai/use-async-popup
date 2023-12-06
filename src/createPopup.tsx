import {
	AnyComponent,
	AsyncPopupPureProps,
	AsyncPopupResolveFn,
	AsyncPopupReturnPromise,
	AsyncPopupReturnType,
	ResolveRef,
} from './types'

export type CreatePopupProps<TComponent extends AnyComponent> = {
	PopupComponent: TComponent
	componentProps: AsyncPopupPureProps<TComponent>
	onResolve?: AsyncPopupResolveFn<AsyncPopupReturnType<TComponent>>
}

export const createPopup = <TComponent extends AnyComponent>(
	props: CreatePopupProps<TComponent>,
): [React.ComponentType, AsyncPopupReturnPromise<TComponent>] => {
	const { PopupComponent, componentProps, onResolve: onResolveProp } = props
	type ReturnType = AsyncPopupReturnType<TComponent>

	const resolveRef: ResolveRef<ReturnType> = {
		current: () => {
			throw new Error("Something went wrong. This function mustn't be called!")
		},
	}

	const promise = new Promise((resolve) => {
		resolveRef.current = resolve
	}) as AsyncPopupReturnPromise<TComponent>

	const onResolve: AsyncPopupResolveFn<ReturnType> = (result) => {
		onResolveProp?.(result)
		resolveRef.current(result)
	}

	function Popup() {
		return (
			// @ts-ignore
			<PopupComponent
				{...componentProps}
				onResolve={onResolve}
			/>
		)
	}

	return [Popup, promise]
}
