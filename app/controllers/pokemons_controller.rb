class PokemonsController < ApplicationController
  
  def index
    @pokemons = Pokemon.all
    render json: @pokemons
  end

  def show
    @pokemon = Pokemon.find(params[:id])
    render json: @pokemon
  end

  def create
    @pokemon = Pokemon.new(pokemon_params)

    if @pokemon.save
      render json: @pokemon, status: :created
    else
      render json: { errors: @pokemon.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @pokemon = Pokemon.find(params[:id])
    if @pokemon.destroy
      render json: { message: "Pokemon deleted successfully" }, status: :ok
    else
      render json: { error: "Failed to delete Pokemon" }, status: :unprocessable_entity
    end
  end

  def edit
    @pokemon = Pokemon.find(params[:id])
  end

  def update
    @pokemon = Pokemon.find(params[:id])
    if @pokemon.update(pokemon_params)
      render json: { message: 'Pokemon was successfully updated', pokemon: @pokemon }, status: :ok
    else
      render json: { errors: @pokemon.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def pokemon_params
    params.require(:pokemon).permit(:name, :description, :element_type, :price)
  end


end
