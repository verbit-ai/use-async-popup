export type AsyncPopupResolveFn<TReturn> = (result: TReturn) => unknown

export type AsyncPopupBaseProps<TReturn> = {
	onResolve: AsyncPopupResolveFn<TReturn>
}

export type AnyComponent = React.ComponentType<any>

export type ResolveRef<TReturn> = React.MutableRefObject<(result: TReturn) => void>

export type AsyncPopupProps<TComponent extends AnyComponent> =
	React.ComponentProps<TComponent> extends AsyncPopupBaseProps<any>
		? React.ComponentProps<TComponent>
		: never

export type AsyncPopupPureProps<TComponent extends AnyComponent> =
	AsyncPopupProps<TComponent> extends never
		? never
		: Omit<React.ComponentProps<TComponent>, keyof AsyncPopupBaseProps<any>>

export type AsyncPopupReturnType<TComponent extends AnyComponent> =
	AsyncPopupProps<TComponent> extends AsyncPopupBaseProps<infer TReturn> ? TReturn : never

export type AsyncPopupReturnPromise<TComponent extends AnyComponent> =
	AsyncPopupReturnType<TComponent> extends never
		? never
		: Promise<AsyncPopupReturnType<TComponent>>

export type AsyncPopupComponent<TComponent extends AnyComponent> =
	AsyncPopupProps<TComponent> extends never ? never : TComponent

export type ShowAsyncPopupFn<TComponent extends AnyComponent> = (
	props: AsyncPopupPureProps<TComponent>,
) => AsyncPopupReturnPromise<TComponent>
