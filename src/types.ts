export type AsyncPopupResolveFn<TReturn> = (result: TReturn) => unknown

export type BaseAsyncPopupProps<TReturn> = {
	onResolve: AsyncPopupResolveFn<TReturn>
}

export type AnyComponent = React.ComponentType<any>

export type ResolveRef<TReturn> = React.MutableRefObject<(result: TReturn) => void>

export type AsyncPopupProps<TComponent extends AnyComponent> =
	React.ComponentProps<TComponent> extends BaseAsyncPopupProps<any>
		? React.ComponentProps<TComponent>
		: never

export type AsyncPopupPureProps<TComponent extends AnyComponent> =
	AsyncPopupProps<TComponent> extends never
		? never
		: Omit<React.ComponentProps<TComponent>, keyof BaseAsyncPopupProps<any>>

export type AsyncPopupReturnType<TComponent extends AnyComponent> =
	AsyncPopupProps<TComponent> extends BaseAsyncPopupProps<infer TReturn> ? TReturn : never

export type AsyncPopupReturnPromise<TComponent extends AnyComponent> =
	AsyncPopupReturnType<TComponent> extends never
		? never
		: Promise<AsyncPopupReturnType<TComponent>>

export type AsyncPopupComponent<TComponent extends AnyComponent> =
	AsyncPopupProps<TComponent> extends never ? never : TComponent

export type ShowAsyncPopupFn<TComponent extends AnyComponent> = (
	props: AsyncPopupPureProps<TComponent>,
) => AsyncPopupReturnPromise<TComponent>
