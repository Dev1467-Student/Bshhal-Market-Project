<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        //  to avoid product image change glitch when variant image selected when refresh
        // because from here before send all images like below seperate and in view page they change that using to take options.
        //  but now based on the selected options, that image will pass - otherwise prdouct image
        // so product change glitch avoids
        $options = $request->input('options') ?: [];
        $placeholder = 'https://placehold.co/600x600/e5e7eb/1f2937?text=No+Image';

        if ($options) {
            $images = $this->getImagesForOptions($options);
        } else {
            $images = $this->getImages();
        }

        return [
            'id'             => $this->id,
            'title'          => $this->title,
            'slug'           => $this->slug,
            'description'    => $this->description,
            'meta_title'     => $this->meta_title,
            'meta_description' => $this->meta_description,
            'price'          => (float) $this->price,
            'quantity'       => $this->quantity,
            'image'          => $this->getFirstMediaUrl('images') ?: $placeholder,
            'images'         => $images->count() > 0 ? $images->map(function ($image) use ($placeholder) {
                return [
                    'id'    => $image->id,
                    'thumb' => $image->getUrl('thumb') ?: $placeholder,
                    'small' => $image->getUrl('small') ?: $placeholder,
                    'large' => $image->getUrl('large') ?: $placeholder,
                ];
            }) : collect([
                [
                    'id' => null,
                    'thumb' => $placeholder,
                    'small' => $placeholder,
                    'large' => $placeholder,
                ]
            ]),
            'user'           => [
                'id'   => $this->user->id,
                'name' => $this->user->name,
                'store_name' => $this->user->vendor->store_name,
            ],
            'department'     => [
                'id'   => $this->department->id,
                'name' => $this->department->name,
                'slug' => $this->department->slug,
            ],
            'category'       => [
                'id'   => $this->category->id,
                'name' => $this->category->name,
            ],
            // product variation types added to that product
            'variationTypes' => $this->variationTypes->map(function ($variationType) use ($placeholder) {
                return [
                    'id'      => $variationType->id,
                    'name'    => $variationType->name,
                    'type'    => $variationType->type,
                    'options' => $variationType->options->map(function ($option) use ($placeholder) {
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
                        ];
                    }),
                ];
            }),

            // product vriations combinations
            'variations'     => $this->variations->map(function ($variation) {
                return [
                    'id'                        => $variation->id,
                    'variation_type_option_ids' => $variation->variation_type_option_ids,
                    'quantity'                  => $variation->quantity,
                    'price'                     => $variation->price !== null ? (float) $variation->price : null,
                ];
            })
        ];
    }
}
