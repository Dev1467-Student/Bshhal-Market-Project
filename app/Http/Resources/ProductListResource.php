<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $placeholder = 'https://placehold.co/600x600/e5e7eb/1f2937?text=No+Image';
        
        return [
            'id'         => $this->id,
            'title'      => $this->title,
            'slug'       => $this->slug,
            // 'price'      => number_format($this->price, 2),
            'price' => (float) $this->getPriceForFirstOptions(),
            'quantity'   => $this->quantity,
            'image'      => $this->getFirstImageUrl() ?: $placeholder,
            'user'       => [
                'id'   => $this->user->id,
                'name' => $this->user->name,
                'store_name' => $this->user->vendor->store_name
            ],
            'department' => [
                'id'   => $this->department->id,
                'name' => $this->department->name,
                'slug' => $this->department->slug,
            ],
            'category' => [
                'id' => $this->category->id,
                'name' => $this->category->name,
            ],
            // --- VARIATION DATA ADDED ---
            'variationTypes' => $this->variationTypes->map(function ($variationType) use ($placeholder) {
                return [
                    'id'      => $variationType->id,
                    'name'    => $variationType->name,
                    'type'    => $variationType->type,
                    'options' => $variationType->options->map(function ($option) use ($variationType, $placeholder) {
                        $optionImages = $option->getMedia('images')->map(function ($image) use ($placeholder) {
                            return [
                                'id'    => $image->id,
                                'thumb' => $image->getUrl('thumb') ?: $placeholder,
                                'small' => $image->getUrl('small') ?: $placeholder,
                                'large' => $image->getUrl('large') ?: $placeholder,
                            ];
                        });
                        return [
                            'id'     => $option->id,
                            'name'   => $option->name,
                            'images' => $optionImages->count() > 0 ? $optionImages : collect([
                                [
                                    'id' => null,
                                    'thumb' => $placeholder,
                                    'small' => $placeholder,
                                    'large' => $placeholder,
                                ]
                            ]),
                            'type' => [
                                'id'   => $variationType->id,
                                'name' => $variationType->name,
                                'type' => $variationType->type,
                            ],
                        ];
                    }),
                ];
            }),
            'variations' => $this->variations->map(function ($variation) {
                return [
                    'id'                         => $variation->id,
                    'variation_type_option_ids' => $variation->variation_type_option_ids,
                    'quantity'                   => $variation->quantity,
                    'price' => $variation->price !== null ? (float) $variation->price : null,
                ];
            }),
        ];
    }
}
