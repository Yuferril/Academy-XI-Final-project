
  

class OrderItemsController < ApplicationController
  before_action :set_order

  # GET /orders/:order_id/order_items
  def index
    @order_items = @order.order_items
    render json: @order_items
  end

  # POST /orders/:order_id/order_items
  def create
    order_items_params[:order_items_list].each do |order_item_params|
      @order_item = @order.order_items.new(order_item_params)
      unless @order_item.save
        render json: { error: @order_item.errors }, status: :unprocessable_entity
        return
      end
    end

    render json: @order.order_items, status: :created
  end

  private

  def set_order
    @order = Order.find(params[:order_id])
  end

  def order_items_params
    params.permit(order_items_list: [:pokemon_id, :quantity, :name, :price, :sprite])
  end
end
