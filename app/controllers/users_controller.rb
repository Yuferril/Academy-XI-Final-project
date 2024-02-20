class UsersController < ApplicationController
  
  def index
    render json: User.all, status: :ok
  end
  
  def new
    @user = User.new
  end

  def show
    user = User.find_by(id: session[:user_id])

    if user
      render json: user, status: :ok
    else
      render json: { error: :"Unauthorized"}, status: :not_authorized
    end
  end

  def create
    @user = User.new(user_params)
  
    if @user.save
      session[:user_id] = @user.id
      render json: { message: 'Account created successfully.' }, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def orders
    user = User.find(session[:user_id])
    orders = user.orders
    render json: orders, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  end
  
  def order_items
    user = User.find(params[:id])
    orders = user.orders.includes(:order_items)

    order_items = []
    orders.each do |order|
      order_items.concat(order.order_items)
    end

    render json: order_items, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  end
  
  private

  def user_params
    params.permit(:username, :password, :email, :firstName, :lastName, :role)
  end
  
end
