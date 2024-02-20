class OrdersController < ApplicationController

  def index
    user = User.find(params[:user_id])
    orders = user.orders.includes(:order_items) # Include order items to avoid N+1 queries

    render json: orders, include: :order_items, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  end

  def show
    @order = Order.find(params[:id])
    render json: @order
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Order not found' }, status: :not_found
  end


  def create
    @order = Order.new(order_params)

    if @order.save
      order_items_params = params[:order_items] || []
      order_items_params.each do |item_params|
        @order.order_items.create(item_params.permit(:pokemon_id, :quantity, :name, :price))
      end

      render json: @order, include: :order_items, status: :created
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  private

  def order_params
    params.require(:order).permit(:address, :postal_code, :state, :country, :city, :credit_card_name, :credit_card_number, :credit_card_expiry, :user_id)
  rescue ActionController::ParameterMissing => e
    render json: { error: e.message }, status: :unprocessable_entity
  end
end
